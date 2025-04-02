import { useState, useEffect } from "react"
import axios from "axios"

export default function EditarUsuarioModal({ usuario, onClose, onSave }) {
  const [nombre, setNombre] = useState(usuario.nombre)
  const [correo, setCorreo] = useState(usuario.correo)
  const [rol, setRol] = useState(usuario.rol)
  const [estado, setEstado] = useState(usuario.estado)
  const [error, setError] = useState("")

  const handleGuardar = async () => {
    if (!nombre || !correo || !rol || !estado) {
      setError("Todos los campos son obligatorios")
      return
    }

    try {
      await axios.put(`http://localhost:5000/api/usuarios/${usuario.id_usuario}`, {
        nombre,
        correo,
        rol,
        estado
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })

      onSave() // Refresca la tabla
      onClose()
    } catch (err) {
      setError("Error al guardar los cambios")
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Editar Usuario</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            >
              <option value="administrador">Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
