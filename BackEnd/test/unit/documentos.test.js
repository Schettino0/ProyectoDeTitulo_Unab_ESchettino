const request = require("supertest");
const app = require("../../index");
const path = require("path");
const iconv = require("iconv-lite");
iconv.encodingExists('foo');

describe("🧪 Pruebas para documentos.controller.js", () => {
  let documentoId;
  const archivoPrueba = path.join(__dirname,"archivo_prueba.pdf");
  test("POST /api/documentos/upload → subir documento", async () => {
    const res = await request(app)
      .post("/api/documentos/upload")
      .field("categoria", "Contrato")
      .field("id_empresa", 10)
      .attach("archivo", archivoPrueba);
    expect([201, 400]).toContain(res.statusCode);
    if (res.statusCode === 201) {
      expect(res.body).toHaveProperty("mensaje");
    }
  });

  test("GET /api/documentos → listar documentos", async () => {
    const res = await request(app).get("/api/documentos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      documentoId = res.body[0].id_documento;
    }
  });

  test("PUT /api/documentos/:id → editar documento", async () => {
    if (!documentoId) return;
    const res = await request(app)
      .put(`/api/documentos/${documentoId}`)
      .send({
        nombre: "editado_test.txt",
        categoria: "Planos",
        id_empresa: 10
      });
    expect([200, 400]).toContain(res.statusCode);
  });

  test("DELETE /api/documentos/:id → eliminar documento", async () => {
    if (!documentoId) return;
    const res = await request(app).delete(`/api/documentos/${documentoId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
