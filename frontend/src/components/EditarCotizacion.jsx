import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalEditarCotizacion({ cotizacion, onClose, onSave }) {
  const [form, setForm] = useState({ ...cotizacion, detalles: [] });
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    if (cotizacion) {
      setForm({
        ...cotizacion,
        fecha_emision: cotizacion.fecha_emision?.slice(0, 10),
        fecha_vencimiento: cotizacion.fecha_vencimiento?.slice(0, 10),
        detalles: cotizacion.detalles || [],
      });
    }

    axios
      .get("http://localhost:5000/api/empresas")
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al cargar empresas:", err));
  }, [cotizacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetalleChange = (index, field, value) => {
    const nuevosDetalles = [...form.detalles];
    nuevosDetalles[index][field] =
      field === "cantidad" || field === "precio_unitario"
        ? Number(value)
        : value;

    if (field === "cantidad" || field === "precio_unitario") {
      nuevosDetalles[index].subtotal = Math.round(
        nuevosDetalles[index].cantidad * nuevosDetalles[index].precio_unitario
      );
    }

    setForm((prev) => ({ ...prev, detalles: nuevosDetalles }));
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
          unidad: "",
          afecto_impuesto: false,
          impuesto: "",
          descuento: 0,
          subtotal: 0,
        },
      ],
    }));
  };

  const eliminarProducto = (index) => {
    const nuevosDetalles = [...form.detalles];
    nuevosDetalles.splice(index, 1);
    setForm((prev) => ({ ...prev, detalles: nuevosDetalles }));
  };

  const handleGuardar = async () => {
    if (form.detalles.length === 0) {
      alert("La cotización debe tener al menos un producto.");
      return;
    }

    try {
      const total = form.detalles.reduce((acc, d) => acc + parseFloat(d.subtotal) || 0, 0);

      const datos = { ...form, total };

      await axios.put(
        `http://localhost:5000/api/cotizaciones/${cotizacion.id_cotizacion}`,
        datos
      );
      onSave();
      onClose();
    } catch (err) {
      console.error("Error al actualizar cotización:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl relative">
        <h2 className="text-xl font-bold mb-4">Editar Cotización</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Empresa</label>
            <select
              name="id_empresa"
              value={form.id_empresa}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="">Seleccione una empresa</option>
              {empresas.map((e) => (
                <option key={e.id_empresa} value={e.id_empresa}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha Emisión</label>
            <input
              type="date"
              name="fecha_emision"
              value={form.fecha_emision}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Fecha Vencimiento
            </label>
            <input
              type="date"
              name="fecha_vencimiento"
              value={form.fecha_vencimiento}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Enlace de Pago</label>
          <input
            type="text"
            name="enlace_pago"
            value={form.enlace_pago}
            onChange={handleChange}
            className="border rounded px-3 py-1 w-full"
          />
        </div>

        {/* Productos */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-lg">🧾 Productos</h3>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                <tr>
                  <th className="px-3 py-2 text-left">Código</th>
                  <th className="px-3 py-2 text-left">Nombre</th>
                  <th className="px-3 py-2 text-center">Cantidad</th>
                  <th className="px-3 py-2 text-right">Precio</th>
                  <th className="px-3 py-2 text-right">Subtotal</th>
                  <th className="px-3 py-2 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {form.detalles.map((d, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={d.codigo_producto}
                        onChange={(e) =>
                          handleDetalleChange(
                            i,
                            "codigo_producto",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={d.nombre_producto}
                        onChange={(e) =>
                          handleDetalleChange(
                            i,
                            "nombre_producto",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        value={d.cantidad}
                        onChange={(e) =>
                          handleDetalleChange(i, "cantidad", e.target.value)
                        }
                        className="w-20 border border-gray-300 rounded px-2 py-1 text-sm text-center"
                      />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <input
                        type="number"
                        value={Math.round(d.precio_unitario)}
                        onChange={(e) =>
                          handleDetalleChange(
                            i,
                            "precio_unitario",
                            e.target.value
                          )
                        }
                        className="w-24 border border-gray-300 rounded px-2 py-1 text-sm text-right"
                      />
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-gray-800">
                      {d.subtotal.toLocaleString("es-CL", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        onClick={() => eliminarProducto(i)}
                        className="text-red-600 hover:text-red-800 text-lg"
                        title="Eliminar"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <button
              onClick={agregarProducto}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              ➕ Agregar Producto
            </button>
          </div>
        </div>

        <div className="text-right mt-6 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
