// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const cotizacionesRoutes = require('./routes/cotizaciones.routes')
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cotizaciones', cotizacionesRoutes);

app.get('/', (req, res) => {
  res.send('Servidor backend operativo 🟢');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
