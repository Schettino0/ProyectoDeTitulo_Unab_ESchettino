import { useEffect, useState } from "react";
import axios from "axios";
import ModalNuevaActividad from "../NuevaActividad";
import useAuth from "../../hooks/useAuth";
import TourIntroActividades from "../TourIntroActividades";

export default function Actividades() {
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroEmpresa, setFiltroEmpresa] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [showModalVer, setShowModalVer] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [actividadesRes, empresasRes, usuariosRes] = await Promise.all([
        axios.get("http://localhost:5000/api/actividades"),
        axios.get("http://localhost:5000/api/empresas"),
        axios.get("http://localhost:5000/api/usuarios"),
      ]);
      setActividades(actividadesRes.data);
      setEmpresas(empresasRes.data);
      setUsuarios(usuariosRes.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const completarActividad = async (id) => {
    if (
      !window.confirm(
        "¿Estás seguro que quieres marcar esta actividad como Finalizada?"
      )
    )
      return;

    try {
      const actividad = actividades.find((a) => a.id_actividad === id);
      await axios.put(`http://localhost:5000/api/actividades/${id}`, {
        ...actividad,
        estado: "Finalizado",
      });
      cargarDatos();
    } catch (err) {
      console.error("Error al completar actividad:", err);
    }
  };

  const actividadesFiltradas = actividades.filter((actividad) => {
    return (
      (filtroEmpresa === "" ||
        actividad.nombre_empresa.includes(filtroEmpresa)) &&
      (filtroUsuario === "" || actividad.nombre_usuario.includes(filtroUsuario))
    );
  });

  const actividadesOrdenadas = [...actividadesFiltradas].sort(
    (a, b) => new Date(b.fecha_programada) - new Date(a.fecha_programada)
  );

  const resumen = {
    total: actividadesFiltradas.length,
    alta: actividadesFiltradas.filter((a) => a.prioridad === "Alta").length,
    media: actividadesFiltradas.filter((a) => a.prioridad === "Media").length,
    baja: actividadesFiltradas.filter((a) => a.prioridad === "Baja").length,
  };

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Limpiar hora de hoy

  const proximasActividades = [...actividadesFiltradas]
    .filter((a) => {
      const fechaActividad = new Date(a.fecha_programada);
      fechaActividad.setHours(0, 0, 0, 0); // Limpiar hora también
      return (
        a.prioridad === "Alta" &&
        !isNaN(fechaActividad.getTime()) &&
        fechaActividad >= hoy
      );
    })
    .sort((a, b) => new Date(a.fecha_programada) - new Date(b.fecha_programada))
    .slice(0, 3);

  const getPrioridadStyle = (prioridad) => {
    const styles = {
      Alta: "bg-red-500 text-white px-2 py-1 rounded-full text-xs",
      Media: "bg-yellow-300 text-gray-800 px-2 py-1 rounded-full text-xs",
      Baja: "bg-green-300 text-gray-800 px-2 py-1 rounded-full text-xs",
    };
    return (
      styles[prioridad] ||
      "bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
    );
  };

  const getEstadoStyle = (estado) => {
    const styles = {
      Completado: "bg-green-500 text-white px-2 py-1 rounded-full text-xs",
      Pendiente: "bg-yellow-500 text-white px-2 py-1 rounded-full text-xs",
      "En progreso": "bg-blue-500 text-white px-2 py-1 rounded-full text-xs",
    };
    return (
      styles[estado] ||
      "bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
    );
  };

  return (
    <div className="p-6 space-y-6" id="actividades-container">
      <TourIntroActividades />
      <h2
        className="text-3xl font-bold text-center text-gray-800"
        id="titulo-gestion"
      >
        Gestión de Actividades
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="lg:col-span-3 bg-white rounded-lg shadow-md p-4"
          id="tabla-actividades"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" id="titulo-actividades">
              Actividades
            </h2>
            <div className="flex gap-2">
              <button
                className="bg-black text-white hover:bg-gray-400 hover:text-white px-4 py-2 rounded"
                onClick={() => setShowModal(true)}
                id="boton-nueva-actividad"
              >
                ➕ Nueva Actividad
              </button>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <select
              value={filtroEmpresa}
              onChange={(e) => setFiltroEmpresa(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              id="filtro-empresa"
            >
              <option value="">Filtrar por Empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id_empresa} value={empresa.nombre}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
            <select
              value={filtroUsuario}
              onChange={(e) => setFiltroUsuario(e.target.value)}
              className="border px-3 py-2 rounded w-full"
              id="filtro-usuario"
            >
              <option value="">Filtrar por Usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id_usuario} value={usuario.nombre}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
          </div>
          <h3
            className="text-lg font-semibold mb-4"
            id="titulo-actividades-taller"
          >
            Actividades del Taller
          </h3>
          <div
            className="overflow-x-auto"
            style={{ maxHeight: "290px", overflowY: "auto" }}
            id="contenedor-tabla"
          >
            <table className="w-full text-sm" id="tabla">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                <tr>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Empresa</th>
                  <th className="px-4 py-2 text-left">Título</th>
                  <th className="px-4 py-2 text-left">Tipo de Actividad</th>
                  <th className="px-4 py-2 text-center">Prioridad</th>
                  <th className="px-4 py-2 text-center">Estado</th>
                  <th className="px-4 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {actividadesOrdenadas.map((actividad, index) => (
                  <tr
                    key={actividad.id_actividad}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
                  >
                    <td className="px-4 py-2">
                      {new Date(
                        actividad.fecha_programada
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{actividad.nombre_empresa}</td>
                    <td className="px-4 py-2">{actividad.titulo}</td>
                    <td className="px-4 py-2">
                      {actividad.tipo_actividad}
                      {actividad.tipo_actividad === "Visita a Planta" && (
                        <>
                          {" | "}
                          {actividad.hora_visita} ⌚
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={getPrioridadStyle(actividad.prioridad)}>
                        {actividad.prioridad}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span className={getEstadoStyle(actividad.estado)}>
                        {actividad.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => {
                          setActividadSeleccionada(actividad);
                          setShowModalVer(true);
                        }}
                        className="border px-2 py-0.5 rounded text-xs hover:bg-gray-900 hover:text-white"
                        id={`boton-ver-${actividad.id_actividad}`}
                      >
                        Ver
                      </button>
                      <button
                        onClick={() =>
                          completarActividad(actividad.id_actividad)
                        }
                        className="border px-2 py-0.5 rounded text-xs text-green-600 hover:bg-green-100"
                        id={`boton-completar-${actividad.id_actividad}`}
                      >
                        Completar
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => {
                              setActividadSeleccionada(actividad);
                              setShowModalEditar(true);
                            }}
                            className="border px-2 py-0.5 rounded text-xs"
                            id={`boton-editar-${actividad.id_actividad}`}
                          >
                            Editar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="lg:col-span-1 bg-white rounded-lg shadow-md p-6"
          id="resumen-actividades"
        >
          <h3 className="text-xl font-semibold mb-6">Resumen de Actividades</h3>
          <ul className="text-base space-y-2">
            <li>
              Total Actividades{" "}
              <span className="float-right font-bold text-lg">
                {resumen.total}
              </span>
            </li>
            <li>
              Prioridad Alta{" "}
              <span className="float-right font-bold text-lg">
                {resumen.alta}
              </span>
            </li>
            <li>
              Prioridad Media{" "}
              <span className="float-right font-bold text-lg">
                {resumen.media}
              </span>
            </li>
            <li>
              Prioridad Baja{" "}
              <span className="float-right font-bold text-lg">
                {resumen.baja}
              </span>
            </li>
          </ul>
        </div>

        <div
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-4"
          id="proximas-actividades"
        >
          <h3 className="text-lg font-semibold mb-4">Próximas Actividades</h3>
          <div className="space-y-3">
            {proximasActividades.map((actividad) => (
              <div
                key={actividad.id_actividad}
                className="border rounded p-3 flex justify-between items-center"
                id={`proxima-actividad-${actividad.id_actividad}`}
              >
                <div>
                  <p className="font-medium">{actividad.titulo}</p>
                  <p className="text-xs text-gray-500">
                    {actividad.nombre_empresa}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(actividad.fecha_programada).toLocaleDateString()}
                  </p>
                </div>
                <span className={getPrioridadStyle(actividad.prioridad)}>
                  {actividad.prioridad}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalNuevaActividad
          onClose={() => setShowModal(false)}
          onSave={cargarDatos}
        />
      )}
      {showModalVer && actividadSeleccionada && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto"
          id="modal-ver"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <h2 className="text-xl font-bold mb-6">Detalle de Actividad</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="col-span-1">
                <strong>Empresa:</strong>
                <p>{actividadSeleccionada.nombre_empresa}</p>
              </div>
              <div className="col-span-1">
                <strong>Usuario:</strong>
                <p>{actividadSeleccionada.nombre_usuario}</p>
              </div>
              <div className="col-span-1">
                <strong>Título:</strong>
                <p>{actividadSeleccionada.titulo}</p>
              </div>
              <div className="col-span-1">
                <strong>Descripción:</strong>
                <p>{actividadSeleccionada.descripcion || "Sin descripción"}</p>
              </div>
              <div className="col-span-1">
                <strong>Fecha:</strong>
                <p>
                  {new Date(
                    actividadSeleccionada.fecha_programada
                  ).toLocaleDateString()}
                </p>
              </div>
              {actividadSeleccionada.hora_visita && (
                <div className="col-span-1">
                  <strong>Hora Visita:</strong>
                  <p>{actividadSeleccionada.hora_visita.slice(0, 5)}</p>
                </div>
              )}
              <div className="col-span-1">
                <strong>Prioridad:</strong>
                <p>{actividadSeleccionada.prioridad}</p>
              </div>
              <div className="col-span-1">
                <strong>Estado:</strong>
                <p>{actividadSeleccionada.estado}</p>
              </div>
              <div className="col-span-2">
                <strong>Tipo de Actividad:</strong>
                <p>{actividadSeleccionada.tipo_actividad}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModalVer(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                id="boton-cerrar-ver"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalEditar && actividadSeleccionada && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto"
          id="modal-editar"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <h2 className="text-xl font-bold mb-6">Editar Actividad</h2>
            <form
              className="space-y-4 text-sm"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(
                    `http://localhost:5000/api/actividades/${actividadSeleccionada.id_actividad}`,
                    actividadSeleccionada
                  );
                  cargarDatos();
                  setShowModalEditar(false);
                } catch (err) {
                  console.error("Error actualizando actividad:", err);
                }
              }}
            >
              <div>
                <label className="block mb-1 font-medium">Título:</label>
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full"
                  value={actividadSeleccionada.titulo}
                  onChange={(e) =>
                    setActividadSeleccionada((prev) => ({
                      ...prev,
                      titulo: e.target.value,
                    }))
                  }
                  id="input-titulo"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Descripción:</label>
                <textarea
                  className="border px-2 py-1 rounded w-full"
                  rows="3"
                  value={actividadSeleccionada.descripcion || ""}
                  onChange={(e) =>
                    setActividadSeleccionada((prev) => ({
                      ...prev,
                      descripcion: e.target.value,
                    }))
                  }
                  id="input-descripcion"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Prioridad:</label>
                <select
                  className="border px-2 py-1 rounded w-full"
                  value={actividadSeleccionada.prioridad}
                  onChange={(e) =>
                    setActividadSeleccionada((prev) => ({
                      ...prev,
                      prioridad: e.target.value,
                    }))
                  }
                  id="select-prioridad"
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Estado:</label>
                <select
                  className="border px-2 py-1 rounded w-full"
                  value={actividadSeleccionada.estado}
                  onChange={(e) =>
                    setActividadSeleccionada((prev) => ({
                      ...prev,
                      estado: e.target.value,
                    }))
                  }
                  id="select-estado"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Tipo de Actividad:
                </label>
                <select
                  className="border px-2 py-1 rounded w-full"
                  value={actividadSeleccionada.tipo_actividad}
                  onChange={(e) =>
                    setActividadSeleccionada((prev) => ({
                      ...prev,
                      tipo_actividad: e.target.value,
                      hora_visita:
                        e.target.value === "Visita a Planta"
                          ? actividadSeleccionada.hora_visita || ""
                          : null,
                    }))
                  }
                  id="select-tipo-actividad"
                >
                  <option value="Visita a Planta">Visita a Planta</option>
                  <option value="Mantenimiento Preventivo">
                    Mantenimiento Preventivo
                  </option>
                  <option value="Mantenimiento Correctivo">
                    Mantenimiento Correctivo
                  </option>
                  <option value="Inspección de Equipos">
                    Inspección de Equipos
                  </option>
                  <option value="Fabricacion Pieza">Fabricacion Pieza</option>
                  <option value="Rectificacion">Rectificacion</option>
                </select>
              </div>

              {actividadSeleccionada.tipo_actividad === "Visita a Planta" && (
                <div>
                  <label className="block mb-1 font-medium">
                    Hora de Visita:
                  </label>
                  <input
                    type="time"
                    className="border px-2 py-1 rounded w-full"
                    value={actividadSeleccionada.hora_visita || ""}
                    onChange={(e) =>
                      setActividadSeleccionada((prev) => ({
                        ...prev,
                        hora_visita: e.target.value,
                      }))
                    }
                    id="input-hora-visita"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModalEditar(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  id="boton-cancelar-editar"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  id="boton-guardar-cambios"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
