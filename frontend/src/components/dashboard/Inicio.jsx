export default function Inicio() {
    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Actividades Recientes
                </h2>
                <p className="text-sm text-gray-500">
                    Aquí se mostrarán las actividades más recientes realizadas en el sistema.
                </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Últimos Documentos Subidos
                </h2>
                <p className="text-sm text-gray-500">
                    Aquí se listarán los documentos más recientes subidos al sistema.
                </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Últimas Cotizaciones Generadas
                </h2>
                <p className="text-sm text-gray-500">
                    Aquí se mostrarán las cotizaciones más recientes generadas.
                </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Trabajos Pendientes
                </h2>
                <p className="text-sm text-gray-500">
                    Aquí se listarán los trabajos pendientes ordenados por importancia.
                </p>
            </div>
        </div>
    )
}