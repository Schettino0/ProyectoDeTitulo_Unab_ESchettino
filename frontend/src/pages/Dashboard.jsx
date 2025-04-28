// Importamos el hook useNavigate de react-router-dom para la navegación
import { useNavigate } from "react-router-dom";
// Importamos el hook personalizado useAuth para la autenticación
import useAuth from "../hooks/useAuth";
// Importamos los hooks useEffect y useState de React
import { useEffect, useState } from "react";
// Importamos el componente Empresas
import Empresas from "../components/empresas";
// Importamos varios iconos de lucide-react
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

// Importamos componentes específicos del dashboard
import Documentos from "../components/dashboard/Documentos";
import Actividades from "../components/dashboard/Actividades";
import Inicio from "../components/dashboard/Inicio";
import Cotizaciones from "../components/dashboard/Cotizaciones";
import NuevaCotizacion from "../components/NuevaCotizacion";
import Usuarios from "../components/usuarios";
import ModalNuevaActividad from "../components/NuevaActividad";

// Componente principal de la página del Dashboard
export default function DashboardPage() {
  // Estado para controlar la visibilidad del modal de nueva actividad
  const [showModalActividad, setShowModalActividad] = useState(false);
  // Hook para la navegación
  const navigate = useNavigate();
  // Obtenemos la autenticación y el rol del usuario
  const { isAuthenticated, user, isAdmin } = useAuth();
  // Estado para manejar la sección activa del dashboard
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  // Efecto para redirigir al login si el usuario no está autenticado
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Función para renderizar el contenido según la sección activa
  const renderContenido = () => {
    switch (seccionActiva) {
      case "documentos":
        return <Documentos />;
      case "actividades":
        return <Actividades />;
      case "cotizaciones":
        return <Cotizaciones setSeccionActiva={setSeccionActiva} />;
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
      {/* Barra lateral del dashboard */}
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

        {/* Navegación principal */}
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

        {/* Navegación de acciones */}
        <nav className="flex flex-col gap-2 text-sm">
          <a
            onClick={() => setShowModalActividad(true)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2"
          >
            <Plus className="w-4 h-4" /> Agregar Actividad
          </a>
          <a
            href="#"
            onClick={() => setSeccionActiva("nuevaCotizacion")}
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${
              !isAdmin ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <FileText className="w-4 h-4" /> Agregar Cotización
          </a>
          <a
            href="/documento/subir"
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 `}
          >
            <Upload className="w-4 h-4" /> Subir Documento
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${
              !isAdmin ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => isAdmin && setSeccionActiva("empresas")}
          >
            <Building className="w-4 h-4" /> Agregar Empresa
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-2 ${
              !isAdmin ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => isAdmin && setSeccionActiva("usuarios")}
          >
            <Users className="w-4 h-4" /> Agregar Empleado
          </a>
        </nav>

        {/* Botón para cerrar sesión */}
        <div className="mt-auto pt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-red-500 hover:bg-red-700 rounded-full px-4 py-2 flex items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            🔒 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal del dashboard */}
      <main className="flex-1 p-4 overflow-y-auto mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {seccionActiva === "inicio"
            ? `Bienvenido, ${user?.nombre || "usuario"} 👋`
            : ""}
        </h1>

        <div className="grid grid-cols-1 gap-6">{renderContenido()}</div>
      </main>
      {/* Modal para agregar nueva actividad */}
      {showModalActividad && (
        <ModalNuevaActividad
          onClose={() => setShowModalActividad(false)}
          onSave={() => {
          }}
        />
      )}
    </div>
  );
}
