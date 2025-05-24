const request = require("supertest");
const app = require("../../index");

describe("🧪 Pruebas para usuarios.controller.js", () => {
  let usuarioId;

  const nuevoUsuario = {
    nombre: "Usuario Test",
    correo: "usuario@test.com",
    contraseña: "test1234",
    rol: "empleado"
  };

  test("POST /api/usuarios → crear usuario", async () => {
    const res = await request(app).post("/api/usuarios").send(nuevoUsuario);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    usuarioId = res.body.id;
  });

  test("GET /api/usuarios → listar usuarios", async () => {
    const res = await request(app).get("/api/usuarios");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("PUT /api/usuarios/:id → actualizar usuario", async () => {
    const res = await request(app)
      .put(`/api/usuarios/${usuarioId}`)
      .send({ nombre: "Usuario Editado", correo: "usuario@test.com", rol: "empleado", estado: "activo" });
    expect(res.statusCode).toBe(200);
  });

  test("DELETE /api/usuarios/:id → eliminar usuario", async () => {
    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(200);
  });
});
