import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

export default function TourIntro() {
  useEffect(() => {
    const yaVisto = localStorage.getItem("tourInicio");
    if (!yaVisto) {
      const tour = introJs();
      tour.setOptions({
        steps: [
          {
            intro:
              "¡Bienvenido al panel principal de Sosemin! Te mostraremos brevemente qué puedes hacer aquí.",
          },
          {
            element: document.querySelector("#card-actividades"),
            intro:
              "Aquí puedes ver el progreso semanal de cada usuario asignado.",
          },
          {
            element: document.querySelector("#card-urgentes"),
            intro:
              "Revisa rápidamente las actividades urgentes con prioridad alta.",
          },
          {
            element: document.querySelector("#card-cotizaciones"),
            intro:
              "Consulta las cotizaciones más recientes realizadas por el equipo.",
          },
          {
            element: document.querySelector("#card-documentos"),
            intro:
              "Aquí se muestran los documentos más recientemente subidos al sistema.",
          },
          {
            element: document.querySelector("#vista-documentos"),
            intro:
              "Aquí accedes a la sección de Documentos, donde puedes subir archivos, clasificarlos y ver su historial.",
          },
          {
            element: document.querySelector("#vista-actividades"),
            intro:
              "Haz clic aquí para ingresar al módulo de Actividades, donde podrás ver, asignar y gestionar tareas por prioridad.",
          },
          {
            element: document.querySelector("#vista-cotizaciones"),
            intro:
              "Este botón te llevará a la sección de Cotizaciones. Allí podrás crear nuevas, editar o generar PDFs.",
          },
        ],
        showProgress: true,
        hidePrev: true,
        exitOnOverlayClick: false,
      });

      tour.start();

      tour.oncomplete(() => localStorage.setItem("tourInicio", "true"));
      tour.onexit(() => localStorage.setItem("tourInicio", "true"));
    }
  }, []);

  return null;
}
