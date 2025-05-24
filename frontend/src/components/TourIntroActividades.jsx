import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

export default function TourIntroActividades() {
  useEffect(() => {
    const yaVisto = localStorage.getItem("tourActividades");
    if (yaVisto) return;

    const tour = introJs();
    tour.setOptions({
      steps: [
        {
          element: document.querySelector("#boton-nueva-actividad"),
          intro: "Crea una nueva actividad para el taller desde aquí.",
        },
        {
          element: document.querySelector("#filtro-empresa"),
          intro: "Filtra las actividades por empresa.",
        },
        {
          element: document.querySelector("#filtro-usuario"),
          intro: "Filtra las actividades por usuario asignado.",
        },
        {
          element: document.querySelector("#tabla-actividades"),
          intro: "Esta tabla muestra todas las actividades registradas con sus detalles.",
        },
        {
          element: document.querySelector("#resumen-actividades"),
          intro: "Aquí verás un resumen de cuántas actividades hay según su prioridad.",
        },
        {
          element: document.querySelector("#proximas-actividades"),
          intro: "Se listan las próximas 3 actividades más cercanas en el tiempo.",
        },
      ],
      showProgress: true,
      exitOnOverlayClick: false,
      showBullets: false,
      doneLabel: "¡Entendido!",
    });

    tour.start();
    tour.oncomplete(() => localStorage.setItem("tourActividades", "true"));
    tour.onexit(() => localStorage.setItem("tourActividades", "true"));
  }, []);

  return null;
}
