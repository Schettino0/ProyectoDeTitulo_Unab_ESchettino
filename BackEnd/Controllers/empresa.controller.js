const Empresa = require("../models/empresa.model");

const crearEmpresa = (req, res) => {
    const { nombre, rut, correo_contacto, telefono, direccion } = req.body;

    if (!nombre || !rut) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevaEmpresa = { nombre, rut, correo_contacto, telefono, direccion };

    Empresa.crearEmpresa(nuevaEmpresa, (err, result) => {
        if (err) {
            console.error("Error al crear empresa:", err.message);
            return res.status(500).json({ error: "Error al crear empresa" });
        }

        res.status(201).json({ message: "Empresa creada exitosamente", id: result.insertId });
    });
};

const obtenerEmpresas = (req, res) => {
    Empresa.obtenerEmpresas((err, rows) => {
        if (err) {
            console.error("Error al obtener empresas:", err.message);
            return res.status(500).json({ error: "Error al obtener empresas" });
        }
        res.json(rows);
    });
};


const eliminarEmpresa = (req, res) => {
    const { id } = req.params;

    Empresa.eliminarEmpresa(id, (err) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                return res.status(400).json({
                    error: 'No se puede eliminar la empresa porque tiene cotizaciones/actividades asociadas.'
                });
            }

            console.error('Error al eliminar empresa:', err.message);
            return res.status(500).json({ error: 'Error al eliminar empresa' });
        }

        res.json({ message: 'Empresa eliminada correctamente' });
    });
};


const obtenerEmpresaPorId = (req, res) => {
    const { id } = req.params;

    Empresa.obtenerEmpresaPorId(id, (err, rows) => {
        if (err) {
            console.error("Error al obtener empresa:", err.message);
            return res.status(500).json({ error: "Error al obtener empresa" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Empresa no encontrada" });
        }

        res.json(rows[0]);
    });
};

module.exports = {
    crearEmpresa,
    obtenerEmpresas,
    eliminarEmpresa,
    obtenerEmpresaPorId
};
