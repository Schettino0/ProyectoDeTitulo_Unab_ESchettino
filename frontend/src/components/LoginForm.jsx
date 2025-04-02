import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginForm() {
  const [correo, setCorreo] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!correo || !contraseña) {
      setError("Por favor completa ambos campos")
      return
    }

    try {
      const res = await axios.post("http://localhost:5000/api/usuarios/login", {
        correo,
        contraseña
      })

      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión")
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-black-700 mb-2">Sosemin</h2>
        <p className="text-center text-gray-500 mb-8">Ingrese sus credenciales para acceder al sistema</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="mt-6 text-center">
          <button className="text-sm text-blue-500 hover:underline">
            ¿Olvidó su contraseña?
          </button>
        </div>
      </div>
    </div>
  )
}
