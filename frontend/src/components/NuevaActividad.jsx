import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalNuevaActividad({ onClose, onSave }) {
  // Estado para manejar los datos del formulario
  const [form, setForm] = useState({
    id_empresa: "",
    id_usuario_asignado: "",
    titulo: "",
    descripcion: "",
    fecha_programada: "",
    tipo_actividad: "",
    hora_visita: "",
    prioridad: "Media",
    estado: "Pendiente",
  });

  // Estado para almacenar las empresas y usuarios disponibles
  const [empresas, setEmpresas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar empresas y usuarios al montar el componente
  useEffect(() => {
    cargarEmpresas();
    cargarUsuarios();
  }, []);

  // Función para cargar las empresas desde la API
  const cargarEmpresas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/empresas");
      setEmpresas(res.data);
    } catch (err) {
      console.error("Error cargando empresas:", err);
    }
  };

  // Función para cargar los usuarios desde la API
  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar la acción de guardar la nueva actividad
  const handleGuardar = async () => {
    // Validaciones básicas
    if (
      !form.id_empresa ||
      !form.id_usuario_asignado ||
      !form.titulo ||
      !form.fecha_programada ||
      !form.tipo_actividad
    ) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/actividades", form);
      onSave(); // Para recargar actividades en el Dashboard
      onClose(); // Para cerrar el modal
    } catch (err) {
      console.error("Error creando actividad:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
        <h2 className="text-xl font-bold mb-6">Nueva Actividad</h2>

        {/* Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Empresa */}
          <div>
            <label className="block text-sm font-medium mb-1">Empresa *</label>
            <select
              name="id_empresa"
              value={form.id_empresa}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Seleccione empresa</option>
              {empresas.map((e) => (
                <option key={e.id_empresa} value={e.id_empresa}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Usuario Asignado */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Usuario Asignado *
            </label>
            <select
              name="id_usuario_asignado"
              value={form.id_usuario_asignado}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Seleccione usuario</option>
              {usuarios.map((u) => (
                <option key={u.id_usuario} value={u.id_usuario}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Título de la Actividad *
            </label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Fecha Programada */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha Programada *
            </label>
            <input
              type="date"
              name="fecha_programada"
              value={form.fecha_programada}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          {/* Tipo de Actividad */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de Actividad *
            </label>
            <select
              name="tipo_actividad"
              value={form.tipo_actividad}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Seleccione tipo de actividad</option>
              <option value="Visita a Planta">Visita a Planta</option>
              <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
              <option value="Mantenimiento Correctivo">Mantenimiento Correctivo</option>
              <option value="Inspección de Equipos">Inspección de Equipos</option>
              <option value="Fabricacion Pieza">Fabricacion Pieza</option>
              <option value="Rectificacion">Rectificacion</option>
            </select>
          </div>

          {/* Hora de Visita */}
          {form.tipo_actividad === "Visita a Planta" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Hora de Visita *
              </label>
              <input
                type="time"
                name="hora_visita"
                value={form.hora_visita}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          )}

          {/* Prioridad */}
          <div>
            <label className="block text-sm font-medium mb-1">Prioridad</label>
            <select
              name="prioridad"
              value={form.prioridad}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              rows="3"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
