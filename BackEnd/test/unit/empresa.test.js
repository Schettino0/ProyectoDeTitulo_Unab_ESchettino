const request = require("supertest");
const app = require("../../index");

describe("🧪 Pruebas para empresa.controller.js", () => {
  let empresaId;

  const nuevaEmpresa = {
    nombre: "Empresa Test",
    rut: "12.345.678-9",
    correo_contacto: "empresa@test.com",
    telefono: "+56912345678",
    direccion: "Av. Prueba 123"
  };

  test("POST /api/empresas → crear empresa", async () => {
    const res = await request(app).post("/api/empresas").send(nuevaEmpresa);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    empresaId = res.body.id;
  });

  test("GET /api/empresas → listar empresas", async () => {
    const res = await request(app).get("/api/empresas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/empresas/:id → obtener empresa por ID", async () => {
    const res = await request(app).get(`/api/empresas/${empresaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nombre");
  });

  test("DELETE /api/empresas/:id → eliminar empresa", async () => {
    const res = await request(app).delete(`/api/empresas/${empresaId}`);
    expect([200, 400]).toContain(res.statusCode);
  });
});
