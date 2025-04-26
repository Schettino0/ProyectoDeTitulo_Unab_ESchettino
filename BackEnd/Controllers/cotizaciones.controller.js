// controllers/cotizaciones.controller.js
const CotizacionModel = require("../models/cotizacion.model");
const DetalleCotizacionModel = require("../models/detallecotizacion.model");

const obtenerCotizaciones = (req, res) => {
  CotizacionModel.obtenerCotizaciones((err, resultados) => {
    if (err) {
      console.error("Error al obtener cotizaciones:", err.message);
      return res.status(500).json({ error: "Error al obtener cotizaciones" });
    }
    res.json(resultados);
  });
};

const obtenerCotizacionPorId = (req, res) => {
  const { id } = req.params;
  CotizacionModel.obtenerCotizacionPorId(id, (err, cotResult) => {
    if (err) {
      console.error("Error al obtener cotización:", err.message);
      return res.status(500).json({ error: "Error al obtener cotización" });
    }
    if (!cotResult.length) {
      return res.status(404).json({ mensaje: "Cotización no encontrada" });
    }
    const cotizacion = cotResult[0];
    DetalleCotizacionModel.obtenerDetallesPorCotizacionId(
      id,
      (err, detalles) => {
        if (err) {
          console.error("Error al obtener detalles:", err.message);
          return res
            .status(500)
            .json({ error: "Error al obtener detalles de la cotización" });
        }
        res.json({ ...cotizacion, detalles });
      }
    );
  });
};

const crearCotizacion = (req, res) => {
  const {
    id_empresa,
    fecha_emision,
    fecha_vencimiento,
    estado,
    total,
    enlace_pago,
    correo_cliente,
    observaciones,
    detalles,
  } = req.body;

  if (
    !id_empresa ||
    !fecha_emision ||
    !fecha_vencimiento ||
    !estado ||
    !total ||
    !Array.isArray(detalles)
  ) {
    return res
      .status(400)
      .json({ error: "Faltan campos obligatorios o detalles inválidos" });
  }

  const nuevaCotizacion = {
    id_empresa,
    fecha_emision,
    fecha_vencimiento,
    estado,
    total,
    enlace_pago,
    correo_cliente,
    observaciones,
  };
  CotizacionModel.crearCotizacion(nuevaCotizacion, (err, result) => {
    if (err) {
      console.error("Error al crear cotización:", err.message);
      return res.status(500).json({ error: "Error al crear cotización" });
    }

    const id_cotizacion = result.insertId;
    const errores = [];

    detalles.forEach((detalle, index) => {
      DetalleCotizacionModel.crearDetalleCotizacion(
        id_cotizacion,
        detalle,
        (err) => {
          if (err) errores.push({ index, error: err.message });
        }
      );
    });

    if (errores.length) {
      return res
        .status(500)
        .json({
          mensaje: "Cotización creada con errores en detalles",
          errores,
        });
    }

    res
      .status(201)
      .json({ mensaje: "Cotización creada exitosamente", id: id_cotizacion });
  });
};

const eliminarCotizacion = (req, res) => {
  const { id } = req.params;

  DetalleCotizacionModel.eliminarDetallesPorCotizacionId(id, (err) => {
    if (err) {
      console.error("Error al eliminar detalles:", err.message);
      return res
        .status(500)
        .json({ error: "Error al eliminar detalles de la cotización" });
    }

    CotizacionModel.eliminarCotizacion(id, (err) => {
      if (err) {
        console.error("Error al eliminar cotización:", err.message);
        return res.status(500).json({ error: "Error al eliminar cotización" });
      }
      res.json({ mensaje: "Cotización eliminada correctamente" });
    });
  });
};

const updateCotizacion = async (req, res) => {
  const { id } = req.params;
  const {
    id_empresa,
    fecha_emision,
    fecha_vencimiento,
    estado,
    total,
    enlace_pago,
    detalles,
  } = req.body;

  try {
    await CotizacionModel.actualizarCotizacion(id, {
      id_empresa,
      fecha_emision,
      fecha_vencimiento,
      estado,
      total,
      enlace_pago,
    });

    await DetalleCotizacionModel.eliminarDetallesPorCotizacionId(id);

    for (const d of detalles) {
      await DetalleCotizacionModel.crearDetalleCotizacion(id, d);
    }

    res.json({ mensaje: "Cotización actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar cotización:", error);
    res.status(500).json({ mensaje: "Error al actualizar cotización" });
  }
};

module.exports = {
  obtenerCotizaciones,
  obtenerCotizacionPorId,
  crearCotizacion,
  eliminarCotizacion,
  updateCotizacion,
};
