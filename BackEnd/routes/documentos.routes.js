const express = require("express")
const router = express.Router()
const upload = require("../config/multer")
const DocumentosController = require("../controllers/documentos.controller")

/**
 * @swagger
 * tags:
 *   name: Documentos
 *   description: Gestión de archivos documentales por empresa y categoría
 */

/**
 * @swagger
 * /api/documentos/upload:
 *   post:
 *     summary: Subir un nuevo documento
 *     tags: [Documentos]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - id_empresa
 *               - categoria
 *               - archivo
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Contrato Sosemin 2025
 *               id_empresa:
 *                 type: string
 *                 example: 1
 *               categoria:
 *                 type: string
 *                 enum: [Contrato, Planos, Otros]
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Documento subido correctamente
 *       400:
 *         description: Faltan campos obligatorios o archivo no válido
 */
router.post(
  "/upload",
  upload.single("archivo"),
  DocumentosController.subirDocumento
)

/**
 * @swagger
 * /api/documentos:
 *   get:
 *     summary: Listar todos los documentos
 *     tags: [Documentos]
 *     responses:
 *       200:
 *         description: Lista de documentos
 */
router.get("/", DocumentosController.listarDocumentos)

/**
 * @swagger
 * /api/documentos/{id}:
 *   delete:
 *     summary: Eliminar un documento por ID
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: Documento eliminado exitosamente
 *       404:
 *         description: Documento no encontrado
 */
router.delete("/:id", DocumentosController.eliminarDocumento)

/**
 * @swagger
 * /api/documentos/{id}:
 *   put:
 *     summary: Editar metadatos de un documento
 *     tags: [Documentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               categoria:
 *                 type: string
 *                 enum: [Contrato, Planos, Otros]
 *     responses:
 *       200:
 *         description: Documento actualizado correctamente
 *       404:
 *         description: Documento no encontrado
 */
router.put("/:id", DocumentosController.editarDocumento)

module.exports = router
