const db = require('../config/db');

const crearEmpresa = (empresa, callback) => {
    const sql = `INSERT INTO empresa (nombre, rut, correo_contacto, telefono, direccion)
               VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [
        empresa.nombre,
        empresa.rut,
        empresa.correo_contacto,
        empresa.telefono,
        empresa.direccion
    ], callback);
};

const obtenerEmpresas = (callback) => {
    const sql = 'SELECT * FROM empresa ORDER BY nombre ASC';
    db.query(sql, callback);
};


const eliminarEmpresa = (id, callback) => {
    const sql = 'DELETE FROM empresa WHERE id_empresa = ?';
    db.query(sql, [id], callback);
};

const obtenerEmpresaPorId = (id, callback) => {
    const sql = 'SELECT * FROM empresa WHERE id_empresa = ?';
    db.query(sql, [id], callback);
  };
  
  module.exports = {
    crearEmpresa,
    obtenerEmpresas,
    eliminarEmpresa,
    obtenerEmpresaPorId
  };
  
