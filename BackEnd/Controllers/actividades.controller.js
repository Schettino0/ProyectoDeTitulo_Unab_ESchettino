const Actividad = require("../models/actividades.model");

// Crear nueva actividad
const crearActividad = (req, res) => {
  const nuevaActividad = req.body;

  // Validación de campos obligatorios
  if (
    !nuevaActividad.titulo ||
    !nuevaActividad.id_empresa ||
    !nuevaActividad.id_usuario_asignado
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  Actividad.crearActividad(nuevaActividad, (err, resultado) => {
    if (err) {
      console.error("Error creando actividad:", err.message);
      return res.status(500).json({ error: "Error creando actividad." });
    }
    res.status(201).json({
      mensaje: "Actividad creada correctamente",
      id: resultado.insertId,
    });
  });
};

// Obtener todas las actividades
const obtenerActividades = (req, res) => {
  Actividad.obtenerActividades((err, resultados) => {
    if (err) {
      console.error("Error obteniendo actividades:", err.message);
      return res.status(500).json({ error: "Error obteniendo actividades." });
    }
    res.json(resultados);
  });
};

// Actualizar actividad
const actualizarActividad = (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;

  Actividad.actualizarActividad(id, datosActualizados, (err) => {
    if (err) {
      console.error("Error actualizando actividad:", err.message);
      return res.status(500).json({ error: "Error actualizando actividad." });
    }
    res.json({ mensaje: "Actividad actualizada correctamente" });
  });
};

// Eliminar actividad
const eliminarActividad = (req, res) => {
  const { id } = req.params;

  Actividad.eliminarActividad(id, (err) => {
    if (err) {
      console.error("Error eliminando actividad:", err.message);
      return res.status(500).json({ error: "Error eliminando actividad." });
    }
    res.json({ mensaje: "Actividad eliminada correctamente" });
  });
};

module.exports = {
  crearActividad,
  obtenerActividades,
  actualizarActividad,
  eliminarActividad,
};
