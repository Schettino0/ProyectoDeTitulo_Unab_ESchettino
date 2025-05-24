import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

export default function TourIntroCotizaciones() {
  useEffect(() => {
    const yaVisto = localStorage.getItem("tourCotizaciones");
    if (yaVisto) return;

    const tour = introJs();
    tour.setOptions({
      steps: [
        {
          element: document.querySelector("#titulo-cotizaciones"),
          intro: "Aquí puedes gestionar todas las cotizaciones del sistema.",
        },
        {
          element: document.querySelector("#filtro-empresa"),
          intro: "Filtra las cotizaciones por empresa desde este menú desplegable.",
        },
        {
          element: document.querySelector("#boton-nueva-cotizacion"),
          intro: "Desde aquí puedes crear una nueva cotización.",
        },
        {
          element: document.querySelector("#tabla-cotizaciones"),
          intro: "Listado de cotizaciones con opciones para ver, editar, eliminar y generar PDF.",
        },
        {
          element: document.querySelector("#resumen-cotizaciones"),
          intro: "Resumen con totales y estados de las cotizaciones registradas.",
        },
        {
          element: document.querySelector("#cotizaciones-recientes"),
          intro: "Sección con las últimas 3 cotizaciones recientes emitidas.",
        },
      ],
      showProgress: true,
      exitOnOverlayClick: false,
      showBullets: false,
      doneLabel: "¡Entendido!",
    });

    setTimeout(() => {
      tour.start();
    }, 300);

    tour.oncomplete(() => localStorage.setItem("tourCotizaciones", "true"));
    tour.onexit(() => localStorage.setItem("tourCotizaciones", "true"));
  }, []);

  return null;
}
