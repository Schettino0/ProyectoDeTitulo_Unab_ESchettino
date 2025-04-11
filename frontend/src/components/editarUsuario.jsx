import { useState, useEffect } from "react"
import axios from "axios"

export default function ModalEditarUsuario({ usuario, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    rol: "",
    estado: ""
  })

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || "",
        correo: usuario.correo || "",
        rol: usuario.rol || "Operador",
        estado: usuario.estado || "activo"
      })
    }
  }, [usuario])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleGuardar = async () => {
    try {
      await axios.put(`http://localhost:5000/api/usuarios/${usuario.id_usuario}`, form)
      onSave()
      onClose()
    } catch (err) {
      console.error("Error al actualizar usuario:", err)
      alert("Ocurrió un error al guardar.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="border w-full px-3 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className="border w-full px-3 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="border w-full px-3 py-1 rounded"
            >
              <option value="Operador">Operador</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="border w-full px-3 py-1 rounded"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
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
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}
