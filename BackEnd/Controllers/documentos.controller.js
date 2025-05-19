const DocumentoModel = require("../models/documentos.model");
const path = require("path");
const fs = require("fs");

const categoriasPermitidas = ["Contrato", "Planos","Cotizacion", "Otros"];

const subirDocumento = (req, res) => {
  const archivo = req.file;
  const { categoria, id_empresa } = req.body;

  if (!archivo) {
    return res.status(400).json({ error: "No se subió ningún archivo" });
  }

  if (!categoria || !id_empresa || !categoriasPermitidas.includes(categoria)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  // Crear carpeta destino definitiva
  const destinoFinal = path.join("uploads", id_empresa, categoria);
  fs.mkdirSync(destinoFinal, { recursive: true });

  const rutaFinal = path.join(destinoFinal, archivo.filename);

  // Mover archivo desde /temp
  const rutaTemp = archivo.path;
  fs.renameSync(rutaTemp, rutaFinal);

  // Guardar en DB
  const datos = {
    nombre: archivo.originalname,
    tipo_archivo: archivo.mimetype,
    categoria,
    fecha_subida: new Date(),
    url_archivo: rutaFinal.replace(/\\/g, "/"),
    id_empresa,
  };

  DocumentoModel.registrarDocumento(datos, (err) => {
    if (err) {
      console.error("Error al registrar documento:", err.message);
      return res.status(500).json({ error: "Error al guardar el documento" });
    }

    res.status(201).json({ mensaje: "Documento subido correctamente" });
  });
};

const listarDocumentos = (req, res) => {
  DocumentoModel.obtenerDocumentos((err, documentos) => {
    if (err) {
      console.error("Error al obtener documentos:", err.message);
      return res.status(500).json({ error: "Error al listar documentos" });
    }
    res.json(documentos);
  });
};

const eliminarDocumento = (req, res) => {
  const { id } = req.params;

  DocumentoModel.obtenerDocumentos((err, documentos) => {
    const doc = documentos.find((d) => d.id_documento == id);
    if (!doc) return res.status(404).json({ error: "Documento no encontrado" });

    const rutaArchivo = path.join(__dirname, "..", doc.url_archivo);

    DocumentoModel.eliminarDocumento(id, (err) => {
      if (err) {
        console.error("Error al eliminar documento:", err.message);
        return res
          .status(500)
          .json({ error: "No se pudo eliminar el documento" });
      }

      fs.unlink(rutaArchivo, (err) => {
        if (err)
          console.warn(
            "Archivo no eliminado (quizás ya no existe):",
            err.message
          );
      });

      res.json({ mensaje: "Documento eliminado correctamente" });
    });
  });
};

const editarDocumento = (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, id_empresa } = req.body;

  if (!categoriasPermitidas.includes(categoria)) {
    return res.status(400).json({ error: "Categoría no válida" });
  }

  const datosActualizados = { nombre, categoria, id_empresa };

  DocumentoModel.editarDocumento(id, datosActualizados, (err) => {
    if (err) {
      console.error("Error al editar documento:", err.message);
      return res.status(500).json({ error: "No se pudo editar el documento" });
    }

    res.json({ mensaje: "Documento actualizado correctamente" });
  });
};

module.exports = {
  subirDocumento,
  listarDocumentos,
  eliminarDocumento,
  editarDocumento,
};
