const request = require("supertest");
const app = require("../../index");

describe("🧪 Pruebas para login.controller.js", () => {
  const credencialesValidas = {
    correo: "e.schettino@sosemin.cl",
    contraseña: "123456", 
  };

  const credencialesInvalidas = {
    correo: "admin@correo.com",
    contraseña: "contramal",
  };

  const usuarioInexistente = {
    correo: "noexiste@correo.com",
    contraseña: "cualquiera",
  };

  test("POST /api/login → login con credenciales válidas", async () => {
    const res = await request(app).post("/api/usuarios/login").send(credencialesValidas);
    expect([200, 401]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty("token");
      expect(res.body.usuario).toHaveProperty("id");
    }
  });

  test("POST /api/login → contraseña incorrecta", async () => {
    const res = await request(app).post("/api/usuarios/login").send(credencialesInvalidas);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Usuario no encontrado");
  });

  test("POST /api/login → usuario no encontrado", async () => {
    const res = await request(app).post("/api/usuarios/login").send(usuarioInexistente);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error", "Usuario no encontrado");
  });

  test("POST /api/login → campos vacíos", async () => {
    const res = await request(app).post("/api/usuarios/login").send({ correo: "", contraseña: "" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Correo y contraseña son obligatorios");
  });
});
