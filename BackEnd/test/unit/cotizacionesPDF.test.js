const request = require("supertest");
const app = require("../../index");
const iconv = require("iconv-lite");
iconv.encodingExists('foo');

describe("🧪 Prueba generación PDF de cotización", () => {
  test("GET /api/cotizaciones/:id/pdf → debería generar un PDF", async () => {
    const res = await request(app).get("/api/cotizaciones/75/pdf");
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("application/pdf");
  });
});
