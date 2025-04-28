const db = require("../config/db");

// Crear actividad
const crearActividad = (actividad, callback) => {
  // Validación de campos obligatorios

  const sql = `
    INSERT INTO Actividad (id_empresa, id_usuario_asignado, tipo_actividad, hora_visita, titulo, descripcion, fecha_programada, prioridad, estado)
    VALUES (?, ?, ?, ?, ?, ?, ?,?,?)
  `;
  const valores = [
    actividad.id_empresa,
    actividad.id_usuario_asignado,
    actividad.tipo_actividad,
    actividad.hora_visita,
    actividad.titulo,
    actividad.descripcion,
    actividad.fecha_programada,
    actividad.prioridad,
    actividad.estado,
  ];
  db.query(sql, valores, callback);
};

// Obtener todas las actividades
const obtenerActividades = (callback) => {
  const sql = `
    SELECT a.*, e.nombre AS nombre_empresa, u.nombre AS nombre_usuario
    FROM Actividad a
    JOIN Empresa e ON a.id_empresa = e.id_empresa
    JOIN Usuario u ON a.id_usuario_asignado = u.id_usuario
  `;
  db.query(sql, callback);
};

// Actualizar actividad
const actualizarActividad = (id, datos, callback) => {  
  const sql = `
    UPDATE Actividad
    SET id_empresa = ?, id_usuario_asignado = ?, tipo_actividad = ?, titulo = ?, descripcion = ?, prioridad = ?, estado = ?, hora_visita = ?
    WHERE id_actividad = ?
  `;
  const valores = [
    datos.id_empresa,
    datos.id_usuario_asignado,
    datos.tipo_actividad,
    datos.titulo,
    datos.descripcion,
    datos.prioridad,
    datos.estado,
    datos.hora_visita,
    id,
  ];
  db.query(sql, valores, callback);
};

// Eliminar actividad
const eliminarActividad = (id, callback) => {
  const sql = `DELETE FROM Actividad WHERE id_actividad = ?`;
  db.query(sql, [id], callback);
};

module.exports = {
  eliminarActividad,
  actualizarActividad,
  obtenerActividades,
  crearActividad,
};
