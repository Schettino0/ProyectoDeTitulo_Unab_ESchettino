// models/usuarios/usuarios.model.js
const db = require('../config/db');

const crearUsuario = (usuario, callback) => {
  const sql = `INSERT INTO usuario (nombre, correo, contraseña, rol, estado)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [
    usuario.nombre,
    usuario.correo,
    usuario.contraseña,
    usuario.rol,
    usuario.estado || 'activo'
  ], callback);
};

const obtenerUsuarios = (callback) => {
  const sql = 'SELECT id_usuario, nombre, correo, rol, estado FROM usuario';
  db.query(sql, callback);
};

// Actualizar usuario
const actualizarUsuario = (id, datos, callback) => {
  const sql = `UPDATE usuario SET nombre = ?, correo = ?, rol = ?, estado = ? WHERE id_usuario = ?`;
  db.query(sql, [datos.nombre, datos.correo, datos.rol, datos.estado, id], callback);
};

// Eliminar usuario
const eliminarUsuario = (id, callback) => {
  const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
  db.query(sql, [id], callback);
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
};