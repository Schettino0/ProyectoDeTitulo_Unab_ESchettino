import { useEffect, useState } from "react"
import axios from "axios"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import EditarUsuarioModal from "../components/EditarUsuarioModal"

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState("")
  const [usuarioEditando, setUsuarioEditando] = useState(null)
  const navigate = useNavigate()
  const { isAuthenticated, isAdmin } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/dashboard")
    } else {
      obtenerUsuarios()
    }
  }, [])

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/usuarios", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      setUsuarios(res.data)
    } catch (err) {
      setError("Error al obtener usuarios")
    }
  }

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return

    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      obtenerUsuarios()
    } catch (err) {
      setError("Error al eliminar usuario")
    }
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-black-700 mb-6">👥 Administración de Usuarios</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-blue-900 text-white text-left">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Correo</th>
                <th className="p-4">Rol</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr
                  key={u.id_usuario}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                >
                  <td className="p-4 font-medium">{u.id_usuario}</td>
                  <td className="p-4">{u.nombre}</td>
                  <td className="p-4">{u.correo}</td>
                  <td className="p-4 capitalize">{u.rol}</td>
                  <td className="p-4 capitalize">{u.estado}</td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => setUsuarioEditando(u)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(u.id_usuario)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No hay usuarios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {usuarioEditando && (
        <EditarUsuarioModal
          usuario={usuarioEditando}
          onClose={() => setUsuarioEditando(null)}
          onSave={obtenerUsuarios}
        />
      )}
    </div>
  )
}
