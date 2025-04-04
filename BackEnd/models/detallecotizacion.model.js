// models/DetalleCotizacion.js
const db = require("../config/db")

const obtenerDetallesPorCotizacionId = (id, callback) => {
  const sql = "SELECT * FROM detallecotizacion WHERE id_cotizacion = ?"
  db.query(sql, [id], callback)
}

const crearDetalleCotizacion = (id_cotizacion, d, callback) => {
  const sql = `INSERT INTO detallecotizacion (
    id_cotizacion, codigo_producto, nombre_producto, descripcion,
    cantidad, precio_unitario, unidad, afecto_impuesto,
    impuesto, descuento, subtotal
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  db.query(sql, [
    id_cotizacion,
    d.codigo_producto,
    d.nombre_producto,
    d.descripcion,
    d.cantidad,
    d.precio_unitario,
    d.unidad,
    d.afecto_impuesto,
    d.impuesto,
    d.descuento,
    d.subtotal
  ], callback)
}

const eliminarDetallesPorCotizacionId = (id, callback) => {
  const sql = "DELETE FROM detallecotizacion WHERE id_cotizacion = ?"
  db.query(sql, [id], callback)
}

module.exports = {
  obtenerDetallesPorCotizacionId,
  crearDetalleCotizacion,
  eliminarDetallesPorCotizacionId
} 
