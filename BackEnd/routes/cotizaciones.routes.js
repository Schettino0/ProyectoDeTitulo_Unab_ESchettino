// routes/cotizaciones.routes.js
const express = require("express")
const router = express.Router()
const cotizacionesController = require("../Controllers/cotizaciones.controller")
const { generarPdfCotizacion } = require("../Controllers/cotizacionesPDF.controller");
const verificarToken = require('../middleware/auth');
const soloAdmin = require('../middleware/adminOnly');


/**
 * @swagger
 * tags:
 *   name: Cotizaciones
 *   description: Gestión de cotizaciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cotizacion:
 *       type: object
 *       required:
 *         - id_empresa
 *         - fecha_emision
 *         - fecha_vencimiento
 *         - estado
 *         - total
 *       properties:
 *         id_empresa:
 *           type: integer
 *           description: ID de la empresa relacionada
 *         fecha_emision:
 *           type: string
 *           format: date
 *           description: Fecha de emisión
 *         fecha_vencimiento:
 *           type: string
 *           format: date
 *           description: Fecha de vencimiento
 *         estado:
 *           type: string
 *           description: Estado de la cotización (por ejemplo "vigente", "expirada")
 *         total:
 *           type: number
 *           description: Monto total
 *         enlace_pago:
 *           type: string
 *           description: Enlace de pago
 *         correo_cliente:
 *           type: string
 *           description: Correo del cliente
 *         observaciones:
 *           type: string
 *           description: Observaciones adicionales
 *       example:
 *         id_empresa: 1
 *         fecha_emision: "2024-04-10"
 *         fecha_vencimiento: "2024-04-20"
 *         estado: "vigente"
 *         total: 250000
 *         enlace_pago: "https://webpay.cl/pago123"
 *         correo_cliente: "cliente@example.com"
 *         observaciones: "Entrega sujeta a confirmación"
 */

/**
 * @swagger
 * /api/cotizaciones:
 *   get:
 *     summary: Obtener todas las cotizaciones
 *     tags: [Cotizaciones]
 *     responses:
 *       200:
 *         description: Lista de cotizaciones
 */
router.get("/", cotizacionesController.obtenerCotizaciones);

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   get:
 *     summary: Obtener cotización por ID
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Cotización encontrada
 */
router.get("/:id", cotizacionesController.obtenerCotizacionPorId);

/**
 * @swagger
 * /api/cotizaciones:
 *   post:
 *     summary: Crear una nueva cotización
 *     tags: [Cotizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cotizacion'
 *     responses:
 *       201:
 *         description: Cotización creada
 */
router.post("/", cotizacionesController.crearCotizacion);

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   put:
 *     summary: Actualizar cotización
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cotizacion'
 *     responses:
 *       200:
 *         description: Cotización actualizada
 */
router.put("/:id", cotizacionesController.updateCotizacion);

/**
 * @swagger
 * /api/cotizaciones/{id}:
 *   delete:
 *     summary: Eliminar cotización
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Cotización eliminada
 */
router.delete("/:id", cotizacionesController.eliminarCotizacion);

/**
 * @swagger
 * /api/cotizaciones/{id}/pdf:
 *   get:
 *     summary: Generar PDF de cotización
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 */
router.get("/:id/pdf", generarPdfCotizacion);


module.exports = router
