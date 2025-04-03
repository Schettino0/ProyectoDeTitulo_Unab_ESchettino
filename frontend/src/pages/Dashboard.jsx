import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react"
import {
  FileText,
  Activity,
  Tag,
  Plus,
  Calendar,
  Upload,
  Building,
  Users
} from "lucide-react"

import Documentos from "../components/dashboard/Documentos"
import Actividades from "../components/dashboard/Actividades"
import Cotizaciones from "../components/dashboard/Cotizaciones"

export default function DashboardPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [seccionActiva, setSeccionActiva] = useState("inicio")

  useEffect(() => {
    if (!isAuthenticated) navigate("/login")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const renderContenido = () => {
    switch (seccionActiva) {
      case "documentos":
        return <Documentos />
      case "actividades":
        return <Actividades />
      case "cotizaciones":
        return <Cotizaciones />
      default:
        return (
          <>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Resumen</h2>
              <p className="text-sm text-gray-500">Aquí se mostrará el resumen del sistema.</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Cotizaciones recientes</h2>
              <p className="text-sm text-gray-500">Próximamente se cargará esta sección.</p>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-white text-black border-r border-gray-200 flex flex-col p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
          <span className="text-xl">⚙️</span>
          <h2>Sosemin</h2>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <button onClick={() => setSeccionActiva("documentos")} className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <FileText className="w-4 h-4" /> Documentos
          </button>
          <button onClick={() => setSeccionActiva("actividades")} className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Activity className="w-4 h-4" /> Actividades
          </button>
          <button onClick={() => setSeccionActiva("cotizaciones")} className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Tag className="w-4 h-4" /> Cotizaciones
          </button>
        </nav>

        <hr className="my-4" />
        <div className="text-xs text-gray-500 uppercase mb-2">Acciones</div>

        <nav className="flex flex-col gap-2 text-sm">
          <a href="/actividad/agregar" className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Plus className="w-4 h-4" /> Agregar Actividad
          </a>
          <a href="/visita/agendar" className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Calendar className="w-4 h-4" /> Agendar Visita
          </a>
          <a href="/cotizacion/agregar" className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <FileText className="w-4 h-4" /> Agregar Cotización
          </a>
          <a href="/documento/subir" className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Upload className="w-4 h-4" /> Subir Documento
          </a>
          <a href="/empresa/agregar" className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Building className="w-4 h-4" /> Agregar Empresa
          </a>
          <a href="/empleado/agregar" className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2">
            <Users className="w-4 h-4" /> Agregar Empleado
          </a>
        </nav>

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            🔒 Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {seccionActiva === "inicio"
            ? `Bienvenido, ${user?.nombre || "usuario"} 👋`
            : seccionActiva.charAt(0).toUpperCase() + seccionActiva.slice(1)}
        </h1>

        <div className="grid grid-cols-2 gap-6">
          {renderContenido()}
        </div>
      </main>
    </div>
  )
}
