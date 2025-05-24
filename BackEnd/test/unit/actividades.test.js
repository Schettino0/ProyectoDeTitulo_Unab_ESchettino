const request = require("supertest");
const app = require("../../index"); // Asegúrate que este archivo inicia tu servidor Express
const db = require("../../config/db");
const iconv = require("iconv-lite");
iconv.encodingExists('foo');

describe("🧪 Pruebas para actividades.controller.js", () => {
  let actividadId;

  const nuevaActividad = {
    titulo: "Prueba Jest",
    id_empresa: 10,
    id_usuario_asignado: 17,
    descripcion: "Actividad creada desde prueba",
    prioridad: "Alta",
    estado: "Pendiente",
    fecha_programada: "2025-05-25",
    tipo_actividad: "Mantenimiento Correctivo",
  };

  // Crear actividad
  test("POST /api/actividades → crear nueva actividad", async () => {
    const res = await request(app).post("/api/actividades").send(nuevaActividad);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    actividadId = res.body.id;
  });

  // Obtener actividades
  test("GET /api/actividades → obtener todas las actividades", async () => {
    const res = await request(app).get("/api/actividades");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Actualizar actividad
  test("PUT /api/actividades/:id → actualizar actividad creada", async () => {
    const res = await request(app)
      .put(`/api/actividades/${actividadId}`)
      .send({ ...nuevaActividad, estado: "Finalizado" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });

  // Eliminar actividad
  test("DELETE /api/actividades/:id → eliminar actividad", async () => {
    const res = await request(app).delete(`/api/actividades/${actividadId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });

  afterAll(() => db.end());
});
