import { useEffect, useState } from "react"
import axios from "axios"

export default function Empresas() {
  const [empresas, setEmpresas] = useState([])
  const [nuevaEmpresa, setNuevaEmpresa] = useState({
    nombre: "",
    rut: "",
    correo_contacto: "",
    telefono: "",
    direccion: ""
  })

  useEffect(() => {
    cargarEmpresas()
  }, [])

  const cargarEmpresas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/empresas")
      setEmpresas(res.data)
    } catch (err) {
      console.error("Error al cargar empresas", err)
    }
  }

  const handleEliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta empresa?")) return
    try {
      await axios.delete(`http://localhost:5000/api/empresas/${id}`)
      cargarEmpresas()
    } catch (err) {
      alert("No se puede eliminar una empresa con cotizaciones/Actividades asociadas.")
    }
  }

  const handleAgregar = async () => {
    try {
      await axios.post("http://localhost:5000/api/empresas", nuevaEmpresa)
      setNuevaEmpresa({ nombre: "", rut: "", correo_contacto: "", telefono: "", direccion: "" })
      cargarEmpresas()
    } catch (err) {
      console.error("Error al agregar empresa", err)
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Agregar Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Nombre" value={nuevaEmpresa.nombre} onChange={e => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })} className="border px-2 py-1 rounded" />
          <input placeholder="RUT" value={nuevaEmpresa.rut} onChange={e => setNuevaEmpresa({ ...nuevaEmpresa, rut: e.target.value })} className="border px-2 py-1 rounded" />
          <input placeholder="Correo contacto" value={nuevaEmpresa.correo_contacto} onChange={e => setNuevaEmpresa({ ...nuevaEmpresa, correo_contacto: e.target.value })} className="border px-2 py-1 rounded" />
          <input placeholder="Teléfono" value={nuevaEmpresa.telefono} onChange={e => setNuevaEmpresa({ ...nuevaEmpresa, telefono: e.target.value })} className="border px-2 py-1 rounded" />
          <input placeholder="Dirección" value={nuevaEmpresa.direccion} onChange={e => setNuevaEmpresa({ ...nuevaEmpresa, direccion: e.target.value })} className="border px-2 py-1 rounded col-span-1 md:col-span-3" />
        </div>
        <button onClick={handleAgregar} className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-400 hover:text-white">Agregar Empresa</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Listado de Empresas</h3>
        <div className="overflow-x-auto rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Nombre</th>
                <th className="px-3 py-2 text-left">RUT</th>
                <th className="px-3 py-2 text-left">Correo</th>
                <th className="px-3 py-2 text-left">Teléfono</th>
                <th className="px-3 py-2 text-left">Dirección</th>
                <th className="px-3 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {empresas.map(emp => (
                <tr key={emp.id_empresa}>
                  <td className="px-3 py-2">{emp.nombre}</td>
                  <td className="px-3 py-2">{emp.rut}</td>
                  <td className="px-3 py-2">{emp.correo_contacto}</td>
                  <td className="px-3 py-2">{emp.telefono}</td>
                  <td className="px-3 py-2">{emp.direccion}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleEliminar(emp.id_empresa)}
                      className="text-red-600 hover:text-red-800 text-sm border px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {empresas.length === 0 && (
                <tr><td className="px-3 py-2" colSpan="6">No hay empresas registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
