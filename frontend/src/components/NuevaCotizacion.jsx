import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function NuevaCotizacion() {
  const [empresas, setEmpresas] = useState([])
  const [form, setForm] = useState({
    id_empresa: "",
    fecha_emision: "",
    fecha_vencimiento: "",
    estado: "Pendiente",
    enlace_pago: "",
    detalles: []
  })
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/api/empresas")
      .then(res => setEmpresas(res.data))
      .catch(err => console.error("Error al cargar empresas", err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDetalleChange = (index, field, value) => {
    const detalles = [...form.detalles]
    detalles[index][field] = field === "cantidad" || field === "precio_unitario"
      ? Number(value)
      : value

    if (field === "cantidad" || field === "precio_unitario") {
      detalles[index].subtotal = detalles[index].cantidad * detalles[index].precio_unitario
    }

    setForm(prev => ({ ...prev, detalles }))
  }

  const agregarProducto = () => {
    setForm(prev => ({
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
          subtotal: 0
        }
      ]
    }))
  }

  const eliminarProducto = (index) => {
    const detalles = [...form.detalles]
    detalles.splice(index, 1)
    setForm(prev => ({ ...prev, detalles }))
  }

  const handleGuardar = async () => {
    if (!form.id_empresa || !form.fecha_emision || !form.fecha_vencimiento) {
      alert("Faltan campos obligatorios.")
      return
    }
    if (form.detalles.length === 0) {
      alert("Debe agregar al menos un producto.")
      return
    }

    const total = form.detalles.reduce((acc, d) => acc + d.subtotal, 0)
    const data = { ...form, total }

    try {
      await axios.post("http://localhost:5000/api/cotizaciones", data)
      alert("Cotización creada exitosamente.")
      navigate("/dashboard")
    } catch (err) {
      console.error("Error al guardar cotización:", err)
    }
  }

  return (
    <div className="p-6  space-y-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold">Nueva Cotización</h2>

      {/* Datos generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Empresa</label>
          <select
            name="id_empresa"
            value={form.id_empresa}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map(e => (
              <option key={e.id_empresa} value={e.id_empresa}>
                {e.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Fecha Emisión</label>
          <input
            type="date"
            name="fecha_emision"
            value={form.fecha_emision}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Fecha Vencimiento</label>
          <input
            type="date"
            name="fecha_vencimiento"
            value={form.fecha_vencimiento}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium">Enlace de Pago</label>
          <input
            type="text"
            name="enlace_pago"
            value={form.enlace_pago}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
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
                onChange={(e) => handleDetalleChange(i, "codigo_producto", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </td>
            <td className="px-3 py-2">
              <input
                type="text"
                value={d.nombre_producto}
                onChange={(e) => handleDetalleChange(i, "nombre_producto", e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </td>
            <td className="px-3 py-2 text-center">
              <input
                type="number"
                value={d.cantidad}
                onChange={(e) => handleDetalleChange(i, "cantidad", e.target.value)}
                className="w-20 border border-gray-300 rounded px-2 py-1 text-sm text-center"
              />
            </td>
            <td className="px-3 py-2 text-right">
              <input
                type="number"
                value={d.precio_unitario}
                onChange={(e) => handleDetalleChange(i, "precio_unitario", e.target.value)}
                className="w-24 border border-gray-300 rounded px-2 py-1 text-sm text-right"
              />
            </td>
            <td className="px-3 py-2 text-right font-medium text-gray-800">
              {d.subtotal.toLocaleString("es-CL", { maximumFractionDigits: 0 })}
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


      {/* Guardar */}
      <div className="text-right mt-4">
        <button onClick={handleGuardar} className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          Guardar Cotización
        </button>
      </div>
    </div>
  )
}
