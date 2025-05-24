const request = require("supertest");
const app = require("../../index"); // Ajusta el path según tu estructura real
const db = require("../../config/db");
const iconv = require("iconv-lite");
iconv.encodingExists("foo");

describe("🧪 Pruebas para cotizaciones.controller.js", () => {
  let idCotizacionCreada;

  const cotizacionPrueba = {
    id_empresa: 10,
    fecha_emision: "2025-05-23",
    fecha_vencimiento: "2025-06-23",
    estado: "Pendiente",
    total: 150000,
    enlace_pago: "https://webpay.test/link123",
    correo_cliente: "cliente@correo.com",
    observaciones: "Cotización de prueba",
    detalles: [
      {
        descripcion: "Producto de prueba",
        cantidad: 2,
        precio_unitario: 75000,
        subtotal: 150000,
      },
    ],
  };

  test("POST /api/cotizaciones → crear nueva cotización", async () => {
    const res = await request(app).post("/api/cotizaciones").send(cotizacionPrueba);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    idCotizacionCreada = res.body.id;
  });

  test("GET /api/cotizaciones → obtener todas las cotizaciones", async () => {
    const res = await request(app).get("/api/cotizaciones");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/cotizaciones/:id → obtener cotización por ID", async () => {
    const res = await request(app).get(`/api/cotizaciones/${idCotizacionCreada}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id_empresa");
    expect(res.body).toHaveProperty("detalles");
  });

  test("PUT /api/cotizaciones/:id → actualizar cotización existente", async () => {
    const nuevaData = { ...cotizacionPrueba, estado: "Aprobada" };
    const res = await request(app).put(`/api/cotizaciones/${idCotizacionCreada}`).send(nuevaData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });

  test("DELETE /api/cotizaciones/:id → eliminar cotización", async () => {
    const res = await request(app).delete(`/api/cotizaciones/${idCotizacionCreada}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });

  afterAll(() => db.end());
});
