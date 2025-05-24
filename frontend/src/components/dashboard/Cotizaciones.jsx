import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditarCotizacion from "../EditarCotizacion";
import useAuth from "../../hooks/useAuth";
import TourIntroCotizaciones from "../TourIntroCotizaciones";

export default function Cotizaciones({ setSeccionActiva }) {
  const { isAuthenticated, user, isAdmin } = useAuth();

  const [cotizaciones, setCotizaciones] = useState([]);
  const [detalle, setDetalle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState("");
  const [showEditar, setShowEditar] = useState(false);
  const [cotizacionEditar, setCotizacionEditar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cotizaciones")
      .then((res) => setCotizaciones(res.data))
      .catch((err) => console.error("Error al obtener cotizaciones", err));

    axios
      .get("http://localhost:5000/api/empresas")
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al obtener empresas", err));
  }, []);

  const cargarCotizaciones = () => {
    axios
      .get("http://localhost:5000/api/cotizaciones")
      .then((res) => {
        const cotizacionesOrdenadas = res.data.sort(
          (a, b) => new Date(b.fecha_emision) - new Date(a.fecha_emision)
        );
        setCotizaciones(cotizacionesOrdenadas);
      })
      .catch((err) => console.error("Error al obtener cotizaciones", err));
  };
  useEffect(() => {
    cargarCotizaciones();
    axios
      .get("http://localhost:5000/api/empresas")
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al obtener empresas", err));
  }, []);

  const verDetalle = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/cotizaciones/${id}`
      );
      setDetalle(res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Error al obtener detalles", err);
    }
  };

  const abrirEdicion = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/cotizaciones/${id}`);
    setCotizacionEditar(res.data);
    setShowEditar(true);
  };

  const eliminarCotizacion = async (id) => {
    if (confirm("¿Estás seguro de eliminar esta cotización?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cotizaciones/${id}`);
        cargarCotizaciones(); // Refresca la tabla
      } catch (err) {
        console.error("Error al eliminar cotización:", err);
      }
    }
  };

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "Aprobado":
        return "bg-green-200 text-green-800";
      case "Pendiente":
        return "bg-yellow-200 text-yellow-800";
      case "Rechazado":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const cotizacionesFiltradas = empresaSeleccionada
    ? cotizaciones.filter((c) => c.id_empresa === Number(empresaSeleccionada))
    : cotizaciones;

  const resumen = {
    total: cotizacionesFiltradas.length,
    aprobadas: cotizacionesFiltradas.filter((c) => c.estado === "Aprobado")
      .length,
    pendientes: cotizacionesFiltradas.filter((c) => c.estado === "Pendiente")
      .length,
    rechazadas: cotizacionesFiltradas.filter((c) => c.estado === "Rechazado")
      .length,
    montoTotal: cotizacionesFiltradas.reduce(
      (acc, c) => acc + Number(c.total || 0),
      0
    ),
  };

  const formatCLP = (monto) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(monto);

  return (
    <div className="p-6 space-y-6" id="cotizaciones-container">
      <TourIntroCotizaciones />
      <h2
        className="text-3xl font-bold text-center text-gray-800"
        id="titulo-gestion-cotizaciones"
      >
        Gestión de Cotizaciones
      </h2>
      {/* Filtro por empresa */}
      <div
        className="mb-4 bg-white rounded-lg shadow-md p-4"
        id="filtro-empresa"
      >
        <label className="block mb-1 font-semibold">Filtrar por Empresa</label>
        <select
          value={empresaSeleccionada}
          onChange={(e) => setEmpresaSeleccionada(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
          id="select-empresa"
        >
          <option value="">Todas las empresas</option>
          {empresas.map((e) => (
            <option key={e.id_empresa} value={e.id_empresa}>
              {e.nombre}
            </option>
          ))}
        </select>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        id="grid-cotizaciones"
      >
        {/* Tabla */}
        <div
          className="lg:col-span-3 bg-white rounded-lg shadow-md p-4"
          id="tabla-cotizaciones"
        >
          <div
            className="flex justify-between items-center mb-4"
            id="header-tabla-cotizaciones"
          >
            <h3 className="text-lg font-semibold">Cotizaciones</h3>
            <button
              onClick={() => setSeccionActiva("nuevaCotizacion")}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                isAdmin
                  ? "bg-black text-white hover:bg-gray-400 hover:text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isAdmin}
              id="boton-nueva-cotizacion"
            >
              📄 Nueva Cotización
            </button>
          </div>
          <div
            className="max-h-[280px] overflow-y-auto"
            id="tabla-cotizaciones-scroll"
          >
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr className="border-b text-left">
                  <th className="py-2 px-3">Cliente</th>
                  <th className="py-2 px-3">Fecha</th>
                  <th className="py-2 px-3">Monto</th>
                  <th className="py-2 px-3">Estado</th>
                  <th className="py-2 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cotizacionesFiltradas.map((c) => (
                  <tr key={c.id_cotizacion} className="border-b">
                    <td className="py-2 px-3">{c.nombre_empresa || "-"}</td>
                    <td className="py-2 px-3">
                      {new Date(c.fecha_emision).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3">{formatCLP(c.total)}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getEstadoStyle(
                          c.estado
                        )}`}
                      >
                        {c.estado}
                      </span>
                    </td>
                    <td className="py-2 px-3 space-x-2 text-center">
                      <button
                        onClick={() => verDetalle(c.id_cotizacion)}
                        className="border px-3 py-1 rounded text-sm hover:bg-gray-900 hover:text-white"
                        id={`btn-ver-${c.id_cotizacion}`}
                      >
                        Ver
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => abrirEdicion(c.id_cotizacion)}
                            className="border px-3 py-1 rounded text-sm hover:bg-gray-900 hover:text-white"
                            id={`btn-editar-${c.id_cotizacion}`}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarCotizacion(c.id_cotizacion)}
                            className="border px-3 py-1 rounded text-sm text-red-600 hover:bg-red-600 hover:text-white"
                            id={`btn-eliminar-${c.id_cotizacion}`}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                      <a
                        href={`http://localhost:5000/api/cotizaciones/${c.id_cotizacion}/pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border px-3 py-1 rounded text-sm hover:bg-gray-900 hover:text-white"
                        id={`link-pdf-${c.id_cotizacion}`}
                      >
                        PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen */}
        <div
          className="lg:col-span-1 bg-white rounded-lg shadow-md p-6"
          id="resumen-cotizaciones"
        >
          <h3 className="text-xl font-semibold mb-4">
            Resumen de Cotizaciones
          </h3>
          <ul className="text-base space-y-2">
            <li>
              Total Cotizaciones{" "}
              <span className="float-right font-bold text-lg">
                {resumen.total}
              </span>
            </li>
            <li>
              Aprobadas{" "}
              <span className="float-right font-bold text-lg">
                {resumen.aprobadas}
              </span>
            </li>
            <li>
              Pendientes{" "}
              <span className="float-right font-bold text-lg">
                {resumen.pendientes}
              </span>
            </li>
            <li>
              Rechazadas{" "}
              <span className="float-right font-bold text-lg">
                {resumen.rechazadas}
              </span>
            </li>
            <li className="border-t pt-3 mt-3 font-bold text-lg">
              Monto Total{" "}
              <span className="float-right">
                {formatCLP(resumen.montoTotal)}
              </span>
            </li>
          </ul>
        </div>

        {/* Recientes */}
        <div
          className="lg:col-span-2 bg-white rounded-lg shadow-md p-4"
          id="cotizaciones-recientes"
        >
          <h3 className="text-lg font-semibold mb-4">Cotizaciones Recientes</h3>
          <div className="space-y-2">
            {cotizacionesFiltradas.slice(0, 3).map((c) => (
              <div
                key={c.id_cotizacion}
                className="border rounded p-3 flex justify-between items-center"
                id={`reciente-${c.id_cotizacion}`}
              >
                <div>
                  <p className="text-sm font-medium">{c.nombre_empresa}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.fecha_emision).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getEstadoStyle(
                    c.estado
                  )}`}
                >
                  {c.estado}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => verDetalle(c.id_cotizacion)}
                    className="text-sm text-blue-600 hover:underline"
                    id={`btn-ver-detalle-${c.id_cotizacion}`}
                  >
                    Ver Detalles
                  </button>
                  <a
                    href={`http://localhost:5000/api/cotizaciones/${c.id_cotizacion}/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:underline"
                    id={`link-generar-pdf-${c.id_cotizacion}`}
                  >
                    Generar PDF
                  </a>
                </div>
                <div className="text-right font-semibold">
                  {formatCLP(c.total)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEditar && cotizacionEditar && (
        <ModalEditarCotizacion
          cotizacion={cotizacionEditar}
          onClose={() => setShowEditar(false)}
          onSave={cargarCotizaciones}
        />
      )}

      {/* Modal de detalle */}
      {showModal && detalle && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          id="modal-detalle"
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-5xl relative">
            <h2 className="text-xl font-bold mb-4">Detalle de Cotización</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Empresa:</strong> {detalle.nombre_empresa}
              </p>
              <p>
                <strong>Fecha emisión:</strong>{" "}
                {new Date(detalle.fecha_emision).toLocaleDateString()}
              </p>
              <p>
                <strong>Fecha vencimiento:</strong>{" "}
                {new Date(detalle.fecha_vencimiento).toLocaleDateString()}
              </p>
              <p>
                <strong>Correo cliente:</strong> {detalle.correo_cliente || "—"}
              </p>
              <p>
                <strong>Estado:</strong> {detalle.estado}
              </p>
              <p>
                <strong>Enlace pago:</strong>{" "}
                {detalle.enlace_pago ? (
                  <a
                    href={detalle.enlace_pago}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    Ver enlace
                  </a>
                ) : (
                  "—"
                )}
              </p>
            </div>

            <h3 className="mt-6 font-semibold text-lg">
              🧾 Detalle de Productos
            </h3>

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-2">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
                  <tr>
                    <th className="px-3 py-2 text-left">Código</th>
                    <th className="px-3 py-2 text-left">Nombre</th>
                    <th className="px-3 py-2 text-left">Descripción</th>
                    <th className="px-3 py-2 text-center">Cantidad</th>
                    <th className="px-3 py-2 text-right">Precio</th>
                    <th className="px-3 py-2 text-right">Afecto</th>
                    <th className="px-3 py-2 text-right">Impuesto</th>
                    <th className="px-3 py-2 text-right">Descuento</th>
                    <th className="px-3 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {detalle.detalles.map((d, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2">{d.codigo_producto}</td>
                      <td className="px-3 py-2">{d.nombre_producto}</td>
                      <td className="px-3 py-2">{d.descripcion}</td>
                      <td className="px-3 py-2 text-center">{d.cantidad}</td>
                      <td className="px-3 py-2 text-right">
                        {formatCLP(d.precio_unitario)}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {d.afecto_impuesto ? "Sí" : "No"}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {d.impuesto || "—"}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {d.descuento ? `${d.descuento}%` : "0%"}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {formatCLP(d.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-4 font-bold">
              Total: {formatCLP(detalle.total)}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              id="btn-cerrar-modal"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
