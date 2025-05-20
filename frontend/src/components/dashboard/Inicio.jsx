import { useEffect, useState } from "react";
import axios from "axios";

export default function Inicio() {
  const [usuarios, setUsuarios] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Error al obtener usuarios", err));

    axios.get("http://localhost:5000/api/actividades")
      .then((res) => setActividades(res.data))
      .catch((err) => console.error("Error al obtener actividades", err));

    axios.get("http://localhost:5000/api/cotizaciones")
      .then((res) => setCotizaciones(res.data.slice(0, 3)))
      .catch((err) => console.error("Error al obtener cotizaciones", err));

    axios.get("http://localhost:5000/api/documentos")
      .then((res) => setDocumentos(res.data.slice(0, 3)))
      .catch((err) => console.error("Error al obtener documentos", err));
  }, []);

  const estaSemana = (fecha) => {
    const hoy = new Date();
    const inicio = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
    const fin = new Date(inicio);
    fin.setDate(fin.getDate() + 6);
    const f = new Date(fecha);
    return f >= inicio && f <= fin;
  };

  const resumenPorUsuario = usuarios.map((usuario) => {
    const actividadesUsuario = actividades.filter(
      (a) => a.id_usuario_asignado === usuario.id_usuario && estaSemana(a.fecha_programada)
    );
    const total = actividadesUsuario.length;
    const completadas = actividadesUsuario.filter((a) => a.estado === "Finalizado").length;
    const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;
    return {
      ...usuario,
      total,
      completadas,
      porcentaje,
    };
  });

  const actividadesUrgentes = actividades
    .filter((a) => a.prioridad === "Alta" && a.estado !== "Finalizado")
    .sort((a, b) => new Date(a.fecha_programada) - new Date(b.fecha_programada))
    .slice(0, 3);

  const formatFecha = (fecha) => new Date(fecha).toLocaleDateString();

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Resumen Semanal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumenPorUsuario.map((usuario) => (
          <div key={usuario.id_usuario} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold text-gray-800">{usuario.nombre}</h3>
            <p className="text-sm text-gray-500 mb-2">Rol: {usuario.rol}</p>
            <div className="mb-1 text-sm text-gray-600">
              {usuario.completadas} de {usuario.total} completadas
            </div>
            <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full ${
                  usuario.porcentaje >= 100
                    ? "bg-green-500"
                    : usuario.porcentaje >= 50
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
                style={{ width: `${usuario.porcentaje}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{usuario.porcentaje}%</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">🔥 Actividades Urgentes (Alta prioridad)</h3>
        {actividadesUrgentes.length === 0 ? (
          <p className="text-sm text-gray-500">No hay actividades urgentes pendientes.</p>
        ) : (
          actividadesUrgentes.map((a) => (
            <div key={a.id_actividad} className="border-b pb-2 mb-2">
              <p className="font-medium">{a.titulo}</p>
              <p className="text-sm text-gray-600">{a.nombre_empresa} — {a.nombre_usuario}</p>
              <p className="text-sm text-gray-500">Fecha programada: {formatFecha(a.fecha_programada)}</p>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">💸 Cotizaciones Recientes</h3>
          {cotizaciones.map((c) => (
            <div key={c.id_cotizacion} className="border-b pb-2 mb-2">
              <p className="font-medium">{c.nombre_empresa}</p>
              <p className="text-sm text-gray-500">Emisión: {formatFecha(c.fecha_emision)}</p>
              <p className="text-sm">
                <span className="font-semibold">Total:</span> ${parseInt(c.total).toLocaleString()}
              </p>
              <span className={`text-xs px-2 py-1 rounded-full font-medium inline-block mt-1 ${
                c.estado === "Aprobado" ? "bg-green-200 text-green-800" :
                c.estado === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-200 text-red-800"
              }`}>
                {c.estado}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">📂 Documentos Recientes</h3>
          {documentos.map((d) => (
            <div key={d.id_documento} className="border-b pb-2 mb-2">
              <p className="font-medium">{d.nombre}</p>
              <p className="text-sm text-gray-600">{d.nombre_empresa}</p>
              <p className="text-sm text-gray-500">{formatFecha(d.fecha_subida)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
