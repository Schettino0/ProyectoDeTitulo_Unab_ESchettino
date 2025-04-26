import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NuevaCotizacion() {
  const [empresas, setEmpresas] = useState([]);
  const [form, setForm] = useState({
    id_empresa: "",
    correo_cliente: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    estado: "Pendiente",
    enlace_pago: "",
    detalles: [],
    observaciones: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/empresas")
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al cargar empresas", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetalleChange = (index, field, value) => {
    const detalles = [...form.detalles];
    detalles[index][field] =
      field === "afecto_impuesto"
        ? value
        : field === "cantidad" ||
          field === "precio_unitario" ||
          field === "descuento"
        ? Number(value)
        : value;

    const d = detalles[index];
    let subtotal = d.cantidad * d.precio_unitario;
    subtotal -= (subtotal * (d.descuento || 0)) / 100;
    if (d.afecto_impuesto && d.impuesto === "IVA 19%") subtotal *= 1.19;
    detalles[index].subtotal = subtotal;
    setForm((prev) => ({ ...prev, detalles }));
  };

  const agregarProducto = () => {
    setForm((prev) => ({
      ...prev,
      detalles: [
        ...prev.detalles,
        {
          codigo_producto: "",
          nombre_producto: "",
          descripcion: "",
          cantidad: 1,
          precio_unitario: 0,
          afecto_impuesto: false,
          impuesto: "",
          descuento: 0,
          subtotal: 0,
          correo_cliente: "",
          observaciones: "",
        },
      ],
    }));
  };

  const eliminarProducto = (index) => {
    const detalles = [...form.detalles];
    detalles.splice(index, 1);
    setForm((prev) => ({ ...prev, detalles }));
  };

  const handleGuardar = async () => {
    if (!form.id_empresa || !form.fecha_emision || !form.fecha_vencimiento) {
      alert("Faltan campos obligatorios.");
      return;
    }
    if (form.detalles.length === 0) {
      alert("Debe agregar al menos un producto.");
      return;
    }

    const total = form.detalles.reduce((acc, d) => acc + d.subtotal, 0);
    const data = { ...form, total };

    try {
      await axios.post("http://localhost:5000/api/cotizaciones", data);
      alert("Cotización creada exitosamente.");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error al guardar cotización:", err);
    }
  };

  const calcularTotales = () => {
    let neto = 0,
      iva = 0,
      descuentoTotal = 0;

    form.detalles.forEach((d) => {
      const base = d.cantidad * d.precio_unitario;
      const descuento = (base * (d.descuento || 0)) / 100;
      descuentoTotal += descuento;
      const baseConDescuento = base - descuento;

      if (d.afecto_impuesto && d.impuesto === "IVA 19%") {
        iva += baseConDescuento * 0.19;
      }

      neto += baseConDescuento;
    });

    const total = neto + iva;
    return { neto, exento: 0, descuentoTotal, iva, total };
  };

  const resumen = calcularTotales();

  return (
    <div className="p-6 space-y-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold">Generar Cotización</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="id_empresa"
            className="block text-sm font-medium text-gray-700"
          >
            Empresa
          </label>
          <select
            id="id_empresa"
            name="id_empresa"
            value={form.id_empresa}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Selecciona una empresa</option>
            {empresas.map((e) => (
              <option key={e.id_empresa} value={e.id_empresa}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="correo_cliente"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Cliente
          </label>
          <input
            id="correo_cliente"
            type="email"
            name="correo_cliente"
            placeholder="Correo cliente"
            value={form.correo_cliente}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fecha_emision"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Emisión
          </label>
          <input
            id="fecha_emision"
            type="date"
            name="fecha_emision"
            value={form.fecha_emision}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label
            htmlFor="fecha_vencimiento"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Vencimiento
          </label>
          <input
            id="fecha_vencimiento"
            type="date"
            name="fecha_vencimiento"
            value={form.fecha_vencimiento}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm mt-4">
          <thead className="bg-gray-100 text-gray-700 font-semibold border-b ">
            <tr>
              <th className="px-3 py-2 text-left rounded-l-lg">Código</th>
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2 text-left">Descripción</th>
              <th className="px-3 py-2 text-center">Cantidad</th>
              <th className="px-3 py-2 text-right">Precio</th>
              <th className="px-3 py-2 text-center">Afecto</th>
              <th className="px-3 py-2 text-left">Impuesto</th>
              <th className="px-3 py-2 text-right">Descuento %</th>
              <th className="px-3 py-2 text-right">Subtotal</th>
              <th className="px-3 py-2 text-center rounded-r-lg">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {form.detalles.map((d, i) => (
              <tr key={i}>
                <td className="px-3 py-2 ">
                  <input
                    value={d.codigo_producto}
                    onChange={(e) =>
                      handleDetalleChange(i, "codigo_producto", e.target.value)
                    }
                    className="w-full border px-2"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={d.nombre_producto}
                    onChange={(e) =>
                      handleDetalleChange(i, "nombre_producto", e.target.value)
                    }
                    className="w-full border px-2"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={d.descripcion}
                    onChange={(e) =>
                      handleDetalleChange(i, "descripcion", e.target.value)
                    }
                    className="w-full border px-2"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="number"
                    min="0"
                    value={d.cantidad}
                    onChange={(e) =>
                      handleDetalleChange(i, "cantidad", e.target.value)
                    }
                    className="w-16 border px-2 text-center"
                  />
                </td>
                <td className="px-3 py-2 text-right">
                  <input
                    type="number"
                    min="0"
                    value={d.precio_unitario}
                    onChange={(e) =>
                      handleDetalleChange(i, "precio_unitario", e.target.value)
                    }
                    className="w-20 border px-2 text-right"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={d.afecto_impuesto}
                    onChange={(e) =>
                      handleDetalleChange(
                        i,
                        "afecto_impuesto",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={d.impuesto}
                    onChange={(e) =>
                      handleDetalleChange(i, "impuesto", e.target.value)
                    }
                    className="w-full border px-2"
                  >
                    <option value="">--</option>
                    <option value="IVA 19%">IVA 19%</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-right">
                  <input
                    type="number"
                    min="0"
                    value={d.descuento}
                    onChange={(e) =>
                      handleDetalleChange(i, "descuento", e.target.value)
                    }
                    className="w-full border px-2 text-right"
                  />
                </td>
                <td className="px-3 py-2 text-right font-medium">
                  {d.subtotal.toLocaleString("es-CL", {
                    maximumFractionDigits: 0,
                  })}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => eliminarProducto(i)}
                    className="text-red-500 hover:underline"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={agregarProducto}
        className="text-blue-600 hover:underline mt-2 text-sm"
      >
        + Agregar Producto
      </button>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          rows="4"
          placeholder="Observaciones"
          className="w-full border rounded px-3 py-2"
        />
        <div className="border p-4 rounded bg-gray-50 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Neto:</span>
            <span>
              $
              {resumen.neto.toLocaleString("es-CL", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Exento:</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between">
            <span>Imp. / Ret.:</span>
            <span>
              $
              {resumen.descuentoTotal.toLocaleString("es-CL", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span>IVA:</span>
            <span>
              $
              {resumen.iva.toLocaleString("es-CL", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>
              $
              {resumen.total.toLocaleString("es-CL", {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right mt-4">
        <button
          onClick={handleGuardar}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Guardar Cotización
        </button>
      </div>
    </div>
  );
}
