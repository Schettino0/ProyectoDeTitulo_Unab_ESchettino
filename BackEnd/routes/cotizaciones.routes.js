// routes/cotizaciones.routes.js
const express = require("express")
const router = express.Router()
const cotizacionesController = require("../Controllers/cotizaciones.controller")
const verificarToken = require('../middleware/auth');
const soloAdmin = require('../middleware/adminOnly');


router.get("/", cotizacionesController.obtenerCotizaciones)
router.get("/:id", cotizacionesController.obtenerCotizacionPorId)
router.post("/", cotizacionesController.crearCotizacion)
router.delete("/:id", cotizacionesController.eliminarCotizacion)

module.exports = router
