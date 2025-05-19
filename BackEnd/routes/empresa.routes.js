const express = require("express");
const router = express.Router();
const EmpresaController = require("../controllers/empresa.controller");


/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Gestión de empresas clientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       required:
 *         - nombre
 *         - rut
 *         - correo_contacto
 *         - telefono
 *         - direccion
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la empresa
 *         rut:
 *           type: string
 *           description: RUT de la empresa (Formato Chileno)
 *         correo_contacto:
 *           type: string
 *           description: Correo electrónico de contacto
 *         telefono:
 *           type: string
 *           description: Teléfono de contacto
 *         direccion:
 *           type: string
 *           description: Dirección física de la empresa
 *       example:
 *         nombre: Minera Los Andes
 *         rut: 76.123.456-7
 *         correo_contacto: contacto@mineralosandes.cl
 *         telefono: +56987654321
 *         direccion: Av. Principal 1234, Santiago
 */

/**
 * @swagger
 * /api/empresas:
 *   post:
 *     summary: Crear nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       201:
 *         description: Empresa creada exitosamente
 */
router.post("/", EmpresaController.crearEmpresa);

/**
 * @swagger
 * /api/empresas:
 *   get:
 *     summary: Obtener todas las empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas
 */
router.get("/", EmpresaController.obtenerEmpresas);

/**
 * @swagger
 * /api/empresas/{id}:
 *   get:
 *     summary: Obtener empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada
 */
router.get("/:id", EmpresaController.obtenerEmpresaPorId);

/**
 * @swagger
 * /api/empresas/{id}:
 *   delete:
 *     summary: Eliminar empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Empresa eliminada exitosamente
 */
router.delete("/:id", EmpresaController.eliminarEmpresa);






module.exports = router;
