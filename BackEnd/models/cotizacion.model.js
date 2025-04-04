// models/Cotizacion.js
const db = require("../config/db")

const obtenerCotizaciones = (callback) => {
  const sql = "SELECT * FROM cotizacion"
  db.query(sql, callback)
}

const obtenerCotizacionPorId = (id, callback) => {
  const sql = "SELECT * FROM cotizacion WHERE id_cotizacion = ?"
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

module.exports = {
  obtenerCotizaciones,
  obtenerCotizacionPorId,
  crearCotizacion,
  eliminarCotizacion
}
