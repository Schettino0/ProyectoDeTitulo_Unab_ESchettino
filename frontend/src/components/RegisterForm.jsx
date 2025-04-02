import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function RegisterForm() {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [rol, setRol] = useState("empleado")
  const [estado, setEstado] = useState("activo")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!nombre || !correo || !contraseña || !rol || !estado) {
      setError("Todos los campos son obligatorios")
      return
    }

    try {
      await axios.post("http://localhost:5000/api/usuarios", {
        nombre,
        correo,
        contraseña,
        rol,
        estado
      })

      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrar usuario")
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-2">Registrar Nuevo Usuario</h2>
        <p className="text-center text-gray-500 mb-8">Solo visible para administradores</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="ej: usuario@sosemin.cl"
            />
          </div>

          <div>
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="administrador">Administrador</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>

          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Registrar Usuario
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={() => navigate("/dashboard")}
          >
            Volver al Panel
          </button>
        </div>
      </div>
    </div>
  )
}
