import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Empresas from "../components/empresas";
import {
  FileText,
  Activity,
  Tag,
  Plus,
  Calendar,
  Upload,
  Building,
  Users,
  Home,
} from "lucide-react";

import Documentos from "../components/dashboard/Documentos";
import Actividades from "../components/dashboard/Actividades";
import Inicio from "../components/dashboard/Inicio";
import Cotizaciones from "../components/dashboard/Cotizaciones";
import NuevaCotizacion from "../components/NuevaCotizacion";
import Usuarios from "../components/usuarios";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderContenido = () => {
    switch (seccionActiva) {
      case "documentos":
        return <Documentos />;
      case "actividades":
        return <Actividades />;
      case "cotizaciones":
        return <Cotizaciones setSeccionActiva={setSeccionActiva} />;
      // case "cotizaciones":
      //   return <Cotizaciones />
      case "nuevaCotizacion":
        return <NuevaCotizacion />;
      case "empresas":
        return <Empresas />;
      case "usuarios":
        return <Usuarios />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-72 bg-white text-black border-r border-gray-200 flex flex-col p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
          <span className="text-xl">⚙️</span>
          <h2>Sosemin</h2>
          <p className="text-xs text-gray-500">v 1.0.0</p>
        {isAdmin ? (
          <p className="text-xs text-red-500">Administrador</p>
        ) : (
          <p className="text-xs text-blue-500">Operador</p>
        )}
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <button
            onClick={() => setSeccionActiva("inicio")}
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <Home className="w-4 h-4" /> Inicio
          </button>
          <button
            onClick={() => setSeccionActiva("documentos")}
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <FileText className="w-4 h-4" /> Documentos
          </button>
          <button
            onClick={() => setSeccionActiva("actividades")}
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <Activity className="w-4 h-4" /> Actividades
          </button>
          <button
            onClick={() => setSeccionActiva("cotizaciones")}
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <Tag className="w-4 h-4" /> Cotizaciones
          </button>
        </nav>

        <hr className="my-4" />
        <div className="text-xs text-gray-500 uppercase mb-2">Acciones</div>

        <nav className="flex flex-col gap-2 text-sm">
          <a
            href="/actividad/agregar"
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <Plus className="w-4 h-4" /> Agregar Actividad
          </a>
          <a
            href="/visita/agendar"
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <Calendar className="w-4 h-4" /> Agendar Visita
          </a>
          <a
            href="#"
            onClick={() => setSeccionActiva("nuevaCotizacion")}
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${!isAdmin ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <FileText className="w-4 h-4" /> Agregar Cotización
          </a>
          <a
            href="/documento/subir"
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${!isAdmin ? 'opacity-50 pointer-events-none' : ''}`}
          >
            <Upload className="w-4 h-4" /> Subir Documento
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${!isAdmin ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => isAdmin && setSeccionActiva("empresas")}
          >
            <Building className="w-4 h-4" /> Agregar Empresa
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${!isAdmin ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => isAdmin && setSeccionActiva("usuarios")}
          >
            <Users className="w-4 h-4" /> Agregar Empleado
          </a>
        </nav>

        <div className="mt-auto pt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-red-500 hover:bg-red-700 rounded-full px-4 py-2 flex items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            🔒 Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 overflow-y-auto mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {seccionActiva === "inicio"
            ? `Bienvenido, ${user?.nombre || "usuario"} 👋`
            : seccionActiva.charAt(0).toUpperCase() + seccionActiva.slice(1)}
        </h1>

        <div className="grid grid-cols-1 gap-6">{renderContenido()}</div>
      </main>
    </div>
  );
}
