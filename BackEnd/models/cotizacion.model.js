// models/Cotizacion.js
const db = require("../config/db")



const obtenerCotizaciones = (callback) => {
  const sql = `
    SELECT c.*, e.nombre AS nombre_empresa
    FROM cotizacion c
    JOIN empresa e ON c.id_empresa = e.id_empresa
  `;
  db.query(sql, callback)
}

const obtenerCotizacionPorId = (id, callback) => {
  const sql = `
    SELECT c.*, e.nombre AS nombre_empresa
    FROM cotizacion c
    JOIN empresa e ON c.id_empresa = e.id_empresa
    WHERE c.id_cotizacion = ?
  `;
  db.query(sql, [id], callback)
}

const crearCotizacion = (data, callback) => {
  const sql = `INSERT INTO cotizacion (
    id_empresa, fecha_emision, fecha_vencimiento,
    estado, total, enlace_pago
  ) VALUES (?, ?, ?, ?, ?, ?)`

  db.query(sql, [
    data.id_empresa,
    data.fecha_emision,
    data.fecha_vencimiento,
    data.estado,
    data.total,
    data.enlace_pago
  ], callback)
}

const eliminarCotizacion = (id, callback) => {
  const sql = "DELETE FROM cotizacion WHERE id_cotizacion = ?"
  db.query(sql, [id], callback)
}

const actualizarCotizacion = (id, datos) => {
  const sql = `
    UPDATE cotizacion
    SET id_empresa = ?, fecha_emision = ?, fecha_vencimiento = ?, estado = ?, total = ?, enlace_pago = ?
    WHERE id_cotizacion = ?
  `;
  return db.promise().query(sql, [
    datos.id_empresa,
    datos.fecha_emision,
    datos.fecha_vencimiento,
    datos.estado,
    datos.total,
    datos.enlace_pago,
    id
  ]);
};


module.exports = {
  obtenerCotizaciones,
  obtenerCotizacionPorId,
  crearCotizacion,
  eliminarCotizacion,
  actualizarCotizacion
}
