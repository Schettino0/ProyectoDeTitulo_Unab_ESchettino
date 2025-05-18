const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const DocumentosController = require("../controllers/documentos.controller");

// Subir archivo
router.post(
  "/upload",
  upload.single("archivo"),
  DocumentosController.subirDocumento
);

// Listar documentos
router.get("/", DocumentosController.listarDocumentos);

// Eliminar documento
router.delete("/:id", DocumentosController.eliminarDocumento);

// Editar Documento
router.put("/:id", DocumentosController.editarDocumento);

module.exports = router;
