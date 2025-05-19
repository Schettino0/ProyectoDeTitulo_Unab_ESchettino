// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Gestión para Sosemin.ltda - API',
      version: '1.0.0',
      description: `
Sistema de gestión digital para Sosemin.ltda, enfocado en la administración de cotizaciones, actividades de mantención y fabricación de repuestos.
Esta API permite gestionar usuarios, empresas, cotizaciones, actividades y registrar operaciones a través de un sistema seguro y centralizado.

Este proyecto fue desarrollado como parte del trabajo de proyecto de título de Eduardo Schettino, utilizando tecnologías como Node.js, React y MySQL.`,
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor local de desarrollo',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta donde Swagger buscará los comentarios
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
