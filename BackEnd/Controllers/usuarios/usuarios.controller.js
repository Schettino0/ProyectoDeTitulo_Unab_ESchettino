// controllers/usuarios/usuarios.controller.js
const bcrypt = require('bcryptjs');
const UsuarioModel = require('../../models/usuarios/usuario.model');

const crearUsuario = (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  if (!nombre || !correo || !contraseña || !rol) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const contraseñaHash = bcrypt.hashSync(contraseña, 10);
  const nuevoUsuario = {
    nombre,
    correo,
    contraseña: contraseñaHash,
    rol,
    estado: 'activo'
  };

  UsuarioModel.crearUsuario(nuevoUsuario, (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err.message);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }

    res.status(201).json({ message: 'Usuario creado exitosamente', id: result.insertId });
  });
};

const obtenerUsuarios = (req, res) => {
  UsuarioModel.obtenerUsuarios((err, resultados) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(resultados);
  });
};

// Actualizar usuario
const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol, estado } = req.body;

  if (!nombre || !correo || !rol || !estado) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const datosActualizados = { nombre, correo, rol, estado };

  UsuarioModel.actualizarUsuario(id, datosActualizados, (err) => {
    if (err) {
      console.error('Error al actualizar usuario:', err.message);
      return res.status(500).json({ error: 'Error al actualizar usuario' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
};

// Eliminar usuario
const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  UsuarioModel.eliminarUsuario(id, (err) => {
    if (err) {
      console.error('Error al eliminar usuario:', err.message);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
};