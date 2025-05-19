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

/**
 * @swagger
 * tags:
 *   name: Actividades
 *   description: Gestión de actividades de mantención y fabricación
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Actividad:
 *       type: object
 *       required:
 *         - id_empresa
 *         - id_usuario_asignado
 *         - tipo_actividad
 *         - titulo
 *         - fecha_programada
 *         - prioridad
 *       properties:
 *         id_empresa:
 *           type: integer
 *           description: ID de la empresa
 *         id_usuario_asignado:
 *           type: integer
 *           description: ID del usuario asignado a la actividad
 *         tipo_actividad:
 *           type: string
 *           description: Tipo de actividad (por ejemplo, mantención, fabricación)
 *         hora_visita:
 *           type: string
 *           description: Hora programada para visita (opcional)
 *         titulo:
 *           type: string
 *           description: Título de la actividad
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la actividad (opcional)
 *         fecha_programada:
 *           type: string
 *           format: date
 *           description: Fecha programada para la actividad
 *         prioridad:
 *           type: integer
 *           description: Nivel de prioridad (Alta, Baja, Media)
 *         estado:
 *           type: string
 *           description: Estado de la actividad
 *       example:
 *         id_empresa: 2
 *         id_usuario_asignado: 5
 *         tipo_actividad: Mantención Correctiva
 *         hora_visita: "15:00"
 *         titulo: Reparar bomba hidráulica
 *         descripcion: Cambio de sellos y revisión de sistema
 *         fecha_programada: "2024-05-02"
 *         prioridad: 1
 *         estado: pendiente
 */

/**
 * @swagger
 * /api/actividades:
 *   post:
 *     summary: Crear nueva actividad
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actividad'
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente
 */
router.post("/", crearActividad);

/**
 * @swagger
 * /api/actividades:
 *   get:
 *     summary: Obtener todas las actividades
 *     tags: [Actividades]
 *     responses:
 *       200:
 *         description: Lista de actividades
 */
router.get("/", obtenerActividades);

/**
 * @swagger
 * /api/actividades/{id}:
 *   put:
 *     summary: Actualizar una actividad
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actividad a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Actividad'
 *     responses:
 *       200:
 *         description: Actividad actualizada exitosamente
 */
router.put("/:id", actualizarActividad);

/**
 * @swagger
 * /api/actividades/{id}:
 *   delete:
 *     summary: Eliminar una actividad
 *     tags: [Actividades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la actividad a eliminar
 *     responses:
 *       200:
 *         description: Actividad eliminada exitosamente
 */
router.delete("/:id", eliminarActividad);


// Exportar el router
module.exports = router;
