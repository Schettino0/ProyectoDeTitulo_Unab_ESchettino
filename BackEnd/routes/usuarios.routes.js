// routes/usuarios/usuarios.routes.js
const express = require("express");
const router = express.Router();
const UsuarioController = require("../Controllers/usuarios.controller");
const LoginController = require("../Controllers/login.controller");
const verificarToken = require("../middleware/auth");
const soloAdmin = require("../middleware/adminOnly");

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios y autenticación
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre
 *         - correo
 *         - contraseña
 *         - rol
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         correo:
 *           type: string
 *           description: Correo electrónico único
 *         contraseña:
 *           type: string
 *           description: Contraseña para autenticación
 *         rol:
 *           type: string
 *           enum: [admin, empleado]
 *           description: Rol asignado al usuario
 *         estado:
 *           type: string
 *           enum: [activo, inactivo]
 *           description: Estado del usuario (activo/inactivo)
 *       example:
 *         nombre: Juan Pérez
 *         correo: juan@example.com
 *         contraseña: 123456
 *         rol: admin
 *         estado: activo
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post("/", UsuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contraseña
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *           example:
 *             correo: juan@example.com
 *             contraseña: 123456
 *     responses:
 *       200:
 *         description: Login exitoso
 */
router.post("/login", LoginController.loginUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", UsuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario (sin cambiar contraseña)
 *     tags: [Usuarios]
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
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               rol:
 *                 type: string
 *               estado:
 *                 type: string
 *           example:
 *             nombre: Juan Actualizado
 *             correo: juan.actualizado@example.com
 *             rol: empleado
 *             estado: activo
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/:id", UsuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete("/:id", UsuarioController.eliminarUsuario);

module.exports = router;
