const db = require("../config/db");

const registrarDocumento = (datos, callback) => {
  const sql = `
    INSERT INTO documento 
    (nombre, tipo_archivo, categoria, fecha_subida, url_archivo, id_empresa)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const valores = [
    datos.nombre,
    datos.tipo_archivo,
    datos.categoria,
    datos.fecha_subida,
    datos.url_archivo,
    datos.id_empresa,
  ];
  db.query(sql, valores, callback);
};

const obtenerDocumentos = (callback) => {
  const sql = `
    SELECT d.*, e.nombre AS nombre_empresa
    FROM documento d
    JOIN empresa e ON d.id_empresa = e.id_empresa
    ORDER BY fecha_subida DESC
  `;
  db.query(sql, callback);
};

const eliminarDocumento = (id, callback) => {
  const sql = `DELETE FROM documento WHERE id_documento = ?`;
  db.query(sql, [id], callback);
};

const editarDocumento = (id, datos, callback) => {
  const sql = `
      UPDATE documento
      SET nombre = ?, categoria = ?, id_empresa = ?
      WHERE id_documento = ?
    `;
  const valores = [datos.nombre, datos.categoria, datos.id_empresa, id];
  db.query(sql, valores, callback);
};

module.exports = {
  registrarDocumento,
  obtenerDocumentos,
  eliminarDocumento,
  editarDocumento,
};
