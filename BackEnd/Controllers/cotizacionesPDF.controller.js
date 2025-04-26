const pdf = require("html-pdf");
const axios = require("axios");

const generarPdfCotizacion = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `http://localhost:5000/api/cotizaciones/${id}`
    );
    const cotizacion = response.data;

    const html = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        h1, h2, h3 { margin: 0; }
        .empresa-header { margin-bottom: 20px; }
        .empresa-header h1 { font-size: 28px; color: #2d3748; }
        .datos-cotizacion { margin-top: 20px; }
        .datos-cotizacion p { margin: 4px 0; }
        .tabla-detalle {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .tabla-detalle th, .tabla-detalle td {
          border: 1px solid #ddd;
          padding: 8px;
          font-size: 14px;
        }
        .tabla-detalle th {
          background-color: #f7fafc;
          text-align: left;
        }
        .resumen-total {
          text-align: right;
          margin-top: 20px;
          font-size: 18px;
          font-weight: bold;
        }
        .observaciones {
          margin-top: 30px;
          font-size: 14px;
          background-color: #f7fafc;
          padding: 15px;
          border-left: 4px solid #4a5568;
        }
        .footer {
          margin-top: 50px;
          font-size: 12px;
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    
    <body>
    
      <div class="empresa-header">
        <h1>${cotizacion.nombre_empresa}</h1>
        <p>RUT: 76.543.210-1 | contacto@empresa-demo.cl</p>
        <p>Dirección: Av. Principal #123, Santiago</p>
        <p>Teléfono: +56 9 1234 5678</p>
      </div>
    
      <hr>
    
      <div class="datos-cotizacion">
        <h2>Cotización #${cotizacion.id_cotizacion}</h2>
        <p><strong>Fecha de Emisión:</strong> ${new Date(
          cotizacion.fecha_emision
        ).toLocaleDateString()}</p>
        <p><strong>Fecha de Vencimiento:</strong> ${new Date(
          cotizacion.fecha_vencimiento
        ).toLocaleDateString()}</p>
        <p><strong>Estado:</strong> ${cotizacion.estado}</p>
        <p><strong>Correo del Cliente:</strong> ${
          cotizacion.correo_cliente || "-"
        }</p>
        <p><strong>Enlace de Pago:</strong> ${
          cotizacion.enlace_pago
            ? `<a href="${cotizacion.enlace_pago}" target="_blank">${cotizacion.enlace_pago}</a>`
            : "-"
        }</p>
      </div>
    
      <h3 style="margin-top: 30px;">🧾 Detalle de Productos</h3>
    
      <table class="tabla-detalle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${cotizacion.detalles
            .map(
              (d) => `
            <tr>
              <td>${d.codigo_producto}</td>
              <td>${d.nombre_producto}</td>
              <td>${d.descripcion || "-"}</td>
              <td>${d.cantidad}</td>
              <td>$${parseInt(d.precio_unitario).toLocaleString("es-CL")}</td>
              <td>$${parseInt(d.subtotal).toLocaleString("es-CL")}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    
      <div class="resumen-total">
        Total: $${parseInt(cotizacion.total).toLocaleString("es-CL")}
      </div>
    
      <div class="observaciones">
        <strong>Observaciones:</strong><br>
        ${cotizacion.observaciones || "Sin observaciones"}
      </div>
    
      <div class="footer">
        Documento generado automáticamente por el sistema de cotizaciones - No requiere firma.
      </div>
    
    </body>
    </html>
    `;

    pdf.create(html).toStream((err, stream) => {
      if (err) {
        console.error("Error creando PDF:", err);
        return res.status(500).send("Error creando PDF");
      }
      res.setHeader("Content-Type", "application/pdf");
      stream.pipe(res);
    });
  } catch (error) {
    console.error("Error al generar PDF de cotización:", error);
    res.status(500).send("Error interno");
  }
};

module.exports = { generarPdfCotizacion };
