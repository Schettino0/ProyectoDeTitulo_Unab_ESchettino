// routes/usuarios/usuarios.routes.js
const express = require('express');
const router = express.Router();
const UsuarioController = require("../Controllers/usuarios.controller");
const LoginController = require("../Controllers/login.controller");
const verificarToken = require('../middleware/auth');
const soloAdmin = require('../middleware/adminOnly');

router.post('/', UsuarioController.crearUsuario);
router.post('/login', LoginController.loginUsuario); 
//Rutas Protegidas por autentificación.
router.get('/', verificarToken, soloAdmin, UsuarioController.obtenerUsuarios);
router.put('/:id', verificarToken, soloAdmin, UsuarioController.actualizarUsuario);
router.delete('/:id', verificarToken, soloAdmin, UsuarioController.eliminarUsuario);

module.exports = router;

