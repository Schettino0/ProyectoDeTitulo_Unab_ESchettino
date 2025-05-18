// index.js

// Importación de módulos necesarios
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db"); // Conexión a la base de datos

// Creación de la aplicación Express
const app = express();

const { swaggerUi, specs } = require("./swagger");

// Configuración de middlewares
app.use(cors()); // Habilitar CORS para permitir solicitudes de diferentes orígenes
app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Importación de rutas
const usuariosRoutes = require("./routes/usuarios.routes");
const cotizacionesRoutes = require("./routes/cotizaciones.routes");
const empresaRoutes = require("./routes/empresa.routes");
const actividadRoutes = require("./routes/actividades.routes");
const documentosRoutes = require("./routes/documentos.routes");

// Definición de rutas de la API
app.use("/api/usuarios", usuariosRoutes); // Rutas para usuarios
app.use("/api/cotizaciones", cotizacionesRoutes); // Rutas para cotizaciones
app.use("/api/empresas", empresaRoutes); // Rutas para empresas
app.use("/api/actividades", actividadRoutes); // Rutas para actividades
app.use("/api/documentos", documentosRoutes); // Ruta para Documentos

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/uploads", express.static("uploads"));

// Ruta raíz para verificar el estado del servidor
app.get("/", (req, res) => {
  res.send("Servidor backend operativo 🟢");
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
