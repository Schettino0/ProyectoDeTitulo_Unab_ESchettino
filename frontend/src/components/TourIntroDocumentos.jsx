import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

export default function TourIntroDocumentos() {
  useEffect(() => {
    const yaVisto = localStorage.getItem("tourDocumentos");
    if (yaVisto) return;

    const tour = introJs();
    tour.setOptions({
      steps: [
        {
          element: document.querySelector("#vista-botones"),
          intro: "Usa estos botones para alternar entre la vista de tabla y de carpetas.",
        },
        {
          element: document.querySelector("#filtro-empresa"),
          intro: "Filtra los documentos según la empresa asociada.",
        },
        {
          element: document.querySelector("#filtro-categoria"),
          intro: "También puedes filtrar por tipo de documento: Contrato, Planos, Otros, etc.",
        },
        {
          element: document.querySelector("#btn-subir-documento"),
          intro: "Haz clic aquí para subir un nuevo documento al sistema.",
        },
        {
          element: document.querySelector("#tabla-documentos"),
          intro: "Aquí se listan todos los documentos registrados, con opciones para ver, descargar o eliminar.",
        }
      ],
      showProgress: true,
      exitOnOverlayClick: false,
      showBullets: false,
      doneLabel: "¡Entendido!",
    });

    tour.start();
    tour.oncomplete(() => localStorage.setItem("tourDocumentos", "true"));
    tour.onexit(() => localStorage.setItem("tourDocumentos", "true"));
  }, []);

  return null;
}
