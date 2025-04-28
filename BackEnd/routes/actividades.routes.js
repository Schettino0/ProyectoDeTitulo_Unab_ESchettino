// Importar express y el controlador de actividades
const express = require("express");
const {
  crearActividad,
  obtenerActividades,
  actualizarActividad,
  eliminarActividad,
} = require("../Controllers/actividades.controller");

// Crear el router
const router = express.Router();

// Definir rutas de actividades
router.post("/", crearActividad); // Crear actividad
router.get("/", obtenerActividades); // Obtener actividades
router.put("/:id", actualizarActividad); // Actualizar actividad
router.delete("/:id", eliminarActividad); // Eliminar actividad

// Exportar el router
module.exports = router;
