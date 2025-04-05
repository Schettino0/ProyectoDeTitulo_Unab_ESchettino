import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ModalEditarCotizacion from "../EditarCotizacion";

export default function Cotizaciones() {
  const navigate = useNavigate()
  const [cotizaciones, setCotizaciones] = useState([])
  const [detalle, setDetalle] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [empresas, setEmpresas] = useState([])
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('')
  const [showEditar, setShowEditar] = useState(false)
  const [cotizacionEditar, setCotizacionEditar] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:5000/api/cotizaciones")
      .then(res => setCotizaciones(res.data))
      .catch(err => console.error("Error al obtener cotizaciones", err))

    axios.get("http://localhost:5000/api/empresas")
      .then(res => setEmpresas(res.data))
      .catch(err => console.error("Error al obtener empresas", err))
  }, [])

  const cargarCotizaciones = () => {
    axios.get("http://localhost:5000/api/cotizaciones")
      .then(res => setCotizaciones(res.data))
      .catch(err => console.error("Error al obtener cotizaciones", err));
  };
  useEffect(() => {
    cargarCotizaciones();
    axios.get("http://localhost:5000/api/empresas")
      .then(res => setEmpresas(res.data))
      .catch(err => console.error("Error al obtener empresas", err));
  }, []);



  const verDetalle = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cotizaciones/${id}`)
      setDetalle(res.data)
      setShowModal(true)
    } catch (err) {
      console.error("Error al obtener detalles", err)
    }
  }

  const abrirEdicion = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/cotizaciones/${id}`)
    setCotizacionEditar(res.data)
    setShowEditar(true)
  }

  const eliminarCotizacion = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta cotización?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cotizaciones/${id}`);
        cargarCotizaciones(); // Refresca la tabla
      } catch (err) {
        console.error("Error al eliminar cotización:", err);
      }
    }
  };


  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "Aprobado": return "bg-green-200 text-green-800"
      case "Pendiente": return "bg-yellow-200 text-yellow-800"
      case "Rechazado": return "bg-red-500 text-white"
      default: return "bg-gray-200 text-gray-700"
    }
  }

  const cotizacionesFiltradas = empresaSeleccionada
    ? cotizaciones.filter(c => c.id_empresa === Number(empresaSeleccionada))
    : cotizaciones

  const resumen = {
    total: cotizacionesFiltradas.length,
    aprobadas: cotizacionesFiltradas.filter(c => c.estado === "Aprobado").length,
    pendientes: cotizacionesFiltradas.filter(c => c.estado === "Pendiente").length,
    rechazadas: cotizacionesFiltradas.filter(c => c.estado === "Rechazado").length,
    montoTotal: cotizacionesFiltradas.reduce((acc, c) => acc + Number(c.total || 0), 0)
  }

  const formatCLP = (monto) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto)





  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Cotizaciones</h2>

      {/* Filtro por empresa */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Filtrar por Empresa</label>
        <select
          value={empresaSeleccionada}
          onChange={(e) => setEmpresaSeleccionada(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
        >
          <option value="">Todas las empresas</option>
          {empresas.map((e) => (
            <option key={e.id_empresa} value={e.id_empresa}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabla */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Cotizaciones</h3>
            <button
              onClick={() => navigate("/nueva-cotizacion")}
              className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
            >📄 Nueva Cotización</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Cliente</th>
                <th className="py-2">Fecha</th>
                <th className="py-2">Monto</th>
                <th className="py-2">Estado</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cotizacionesFiltradas.map((c) => (
                <tr key={c.id_cotizacion} className="border-b">
                  <td className="py-2">{c.nombre_empresa || '-'}</td>
                  <td className="py-2">{new Date(c.fecha_emision).toLocaleDateString()}</td>
                  <td className="py-2">{formatCLP(c.total)}</td>
                  <td className="py-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEstadoStyle(c.estado)}`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="py-2 space-x-2 text-center">
                    <button onClick={() => verDetalle(c.id_cotizacion)} className="border px-3 py-1 rounded text-sm hover:bg-gray-900 hover:text-white">Ver</button>
                    <button onClick={() => abrirEdicion(c.id_cotizacion)} className="border px-3 py-1 rounded text-sm">Editar</button>
                    <button
                      onClick={() => eliminarCotizacion(c.id_cotizacion)}
                      className="border px-3 py-1 rounded text-sm text-red-600 hover:bg-red-100"
                    >
                      Eliminar
                    </button>
                    <button className="border px-3 py-1 rounded text-sm  hover:bg-gray-900 hover:text-white">PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Resumen de Cotizaciones</h3>
          <ul className="text-sm space-y-1">
            <li>Total Cotizaciones <span className="float-right font-bold">{resumen.total}</span></li>
            <li>Aprobadas <span className="float-right font-bold">{resumen.aprobadas}</span></li>
            <li>Pendientes <span className="float-right font-bold">{resumen.pendientes}</span></li>
            <li>Rechazadas <span className="float-right font-bold">{resumen.rechazadas}</span></li>
            <li className="border-t pt-2 mt-2 font-bold">Monto Total <span className="float-right">{formatCLP(resumen.montoTotal)}</span></li>
          </ul>
        </div>

        {/* Recientes */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Cotizaciones Recientes</h3>
          <div className="space-y-2">
            {cotizacionesFiltradas.slice(0, 3).map(c => (
              <div key={c.id_cotizacion} className="border rounded p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{c.nombre_empresa}</p>
                  <p className="text-xs text-gray-500">{new Date(c.fecha_emision).toLocaleDateString()}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEstadoStyle(c.estado)}`}>
                  {c.estado}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => verDetalle(c.id_cotizacion)} className="text-sm text-blue-600 hover:underline">Ver Detalles</button>
                  <button className="text-sm text-gray-600 hover:underline">Generar PDF</button>
                </div>
                <div className="text-right font-semibold">{formatCLP(c.total)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {showEditar && cotizacionEditar && (
        <ModalEditarCotizacion
          cotizacion={cotizacionEditar}
          onClose={() => setShowEditar(false)}
          onSave={cargarCotizaciones}
        />
      )}

      {/* Modal de detalle */}
      {showModal && detalle && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
            <h2 className="text-xl font-bold mb-4">Detalle de Cotización</h2>
            <p><strong>Empresa:</strong> {detalle.nombre_empresa}</p>
            <p><strong>Fecha emisión:</strong> {new Date(detalle.fecha_emision).toLocaleDateString()}</p>
            <p><strong>Fecha vencimiento:</strong> {new Date(detalle.fecha_vencimiento).toLocaleDateString()}</p>

            <h3 className="mt-4 font-semibold">Productos</h3>
            <table className="w-full text-sm mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-2 py-1">Código</th>
                  <th className="text-left px-2 py-1">Nombre</th>
                  <th className="text-left px-2 py-1">Descripción</th>
                  <th className="text-center px-2 py-1">Cantidad</th>
                  <th className="text-right px-2 py-1">Precio</th>
                  <th className="text-right px-2 py-1">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalle.detalles.map((d, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-2 py-1">{d.codigo_producto}</td>
                    <td className="px-2 py-1">{d.nombre_producto}</td>
                    <td className="px-2 py-1">{d.descripcion}</td>
                    <td className="text-center px-2 py-1">{d.cantidad}</td>
                    <td className="text-right px-2 py-1">{formatCLP(d.precio_unitario)}</td>
                    <td className="text-right px-2 py-1">{formatCLP(d.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-4 font-bold">
              Total: {formatCLP(detalle.total)}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >✖</button>
          </div>
        </div>
      )}
    </div>
  )
}
