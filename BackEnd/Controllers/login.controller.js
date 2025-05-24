// controllers/usuarios/login.controller.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUsuario = (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  const sql = 'SELECT * FROM usuario WHERE correo = ? LIMIT 1';
  db.query(sql, [correo], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (resultados.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = resultados[0];
    const contraseñaValida = bcrypt.compareSync(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  });
};

module.exports = { loginUsuario };
