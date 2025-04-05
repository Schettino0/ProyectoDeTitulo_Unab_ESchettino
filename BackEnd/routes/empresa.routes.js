const express = require("express");
const router = express.Router();
const EmpresaController = require("../controllers/empresa.controller");

router.post("/", EmpresaController.crearEmpresa);
router.get("/", EmpresaController.obtenerEmpresas);
router.delete("/:id", EmpresaController.eliminarEmpresa);
router.get("/:id", EmpresaController.obtenerEmpresaPorId);





module.exports = router;
