import { useEffect, useState } from "react";
import axios from "axios";

export default function Documentos() {
  const [documentos, setDocumentos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [vista, setVista] = useState("tabla");
  const [carpetaAbierta, setCarpetaAbierta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filtroEmpresa, setFiltroEmpresa] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  const [nuevoDoc, setNuevoDoc] = useState({
    nombre: "",
    id_empresa: "",
    categoria: "",
    archivo: null,
  });

  useEffect(() => {
    cargarDocumentos();
    axios
      .get("http://localhost:5000/api/empresas")
      .then((res) => setEmpresas(res.data))
      .catch((err) => console.error("Error al obtener empresas", err));
  }, []);

  const cargarDocumentos = () => {
    axios
      .get("http://localhost:5000/api/documentos")
      .then((res) => setDocumentos(res.data))
      .catch((err) => console.error("Error al obtener documentos", err));
  };

  const handleArchivo = (e) => {
    setNuevoDoc((prev) => ({ ...prev, archivo: e.target.files[0] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoDoc((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { nombre, id_empresa, categoria, archivo } = nuevoDoc;
    if (!nombre || !id_empresa || !categoria || !archivo) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("id_empresa", id_empresa);
    formData.append("categoria", categoria);
    formData.append("archivo", archivo);

    try {
      await axios.post("http://localhost:5000/api/documentos/upload", formData);
      setShowModal(false);
      cargarDocumentos();
    } catch (err) {
      console.error("Error al subir documento:", err);
    }
  };

  const eliminarDocumento = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este documento?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/documentos/${id}`);
      cargarDocumentos();
    } catch (err) {
      console.error("Error al eliminar documento:", err);
    }
  };

  const documentosFiltrados = documentos.filter((doc) => {
    const empresaMatch = !filtroEmpresa || doc.id_empresa == filtroEmpresa;
    const categoriaMatch =
      !filtroCategoria || doc.categoria === filtroCategoria;
    return empresaMatch && categoriaMatch;
  });

  useEffect(() => {
    setCategoriaSeleccionada(null);
    setEmpresaSeleccionada(null);
  }, [vista]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Gestión de Documentos
      </h2>

      <div className="flex justify-between items-center bg-white p-4 rounded shadow-md">
        <div className="space-x-2">
          <button
            onClick={() => setVista("tabla")}
            className={`px-4 py-2 border rounded ${
              vista === "tabla" ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Vista de Tabla
          </button>
          <button
            onClick={() => setVista("carpeta")}
            className={`px-4 py-2 border rounded ${
              vista === "carpeta"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            Vista de Carpetas
          </button>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-5 py-2 rounded shadow-md hover:bg-gray-800"
        >
          📁 Subir Documento
        </button>
      </div>

      {vista === "tabla" && (
        <>
          <div className="flex flex-wrap gap-4 mb-4">
            <select
              onChange={(e) => setFiltroEmpresa(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">Filtrar por empresa</option>
              {empresas.map((e) => (
                <option key={e.id_empresa} value={e.id_empresa}>
                  {e.nombre}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">Filtrar por categoría</option>
              {["Contrato", "Planos", "Otros"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white shadow-lg rounded p-6 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b text-left">
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">Empresa</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {documentosFiltrados.map((doc) => (
                  <tr
                    key={doc.id_documento}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{doc.nombre}</td>
                    <td className="px-4 py-3">{doc.nombre_empresa}</td>
                    <td className="px-4 py-3">{doc.categoria}</td>
                    <td className="px-4 py-3">
                      {new Date(doc.fecha_subida).toLocaleDateString()}
                    </td>
                    <td className="text-center space-x-2">
                      <a
                        href={`http://localhost:5000/${doc.url_archivo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-black hover:underline"
                      >
                        Ver
                      </a>
                      <a
                        href={`http://localhost:5000/${doc.url_archivo}`}
                        download
                        className="text-green-600 hover:underline"
                      >
                        Descargar
                      </a>
                      <button
                        onClick={() => eliminarDocumento(doc.id_documento)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {vista === "carpeta" && (
        <>
          {!categoriaSeleccionada && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...new Set(documentosFiltrados.map((d) => d.categoria))].map(
                (categoria) => (
                  <div
                    key={categoria}
                    onClick={() => setCategoriaSeleccionada(categoria)}
                    className="border p-6 rounded shadow-md text-center bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="text-5xl">📁</div>
                    <p className="font-semibold mt-3 text-lg">{categoria}</p>
                  </div>
                )
              )}
            </div>
          )}

          {categoriaSeleccionada && !empresaSeleccionada && (
            <div>
              <button
                onClick={() => setCategoriaSeleccionada(null)}
                className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ← Volver a Categorías
              </button>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  ...new Set(
                    documentosFiltrados
                      .filter((d) => d.categoria === categoriaSeleccionada)
                      .map((d) => d.nombre_empresa)
                  ),
                ].map((empresa) => (
                  <div
                    key={empresa}
                    onClick={() => setEmpresaSeleccionada(empresa)}
                    className="border p-6 rounded shadow-md text-center bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="text-5xl">🏢</div>
                    <p className="font-semibold mt-3 text-lg">{empresa}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {categoriaSeleccionada && empresaSeleccionada && (
            <div>
              <button
                onClick={() => setEmpresaSeleccionada(null)}
                className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ← Volver a Empresas
              </button>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {documentosFiltrados
                  .filter(
                    (d) =>
                      d.categoria === categoriaSeleccionada &&
                      d.nombre_empresa === empresaSeleccionada
                  )
                  .map((doc) => (
                    <div
                      key={doc.id_documento}
                      className="border p-4 rounded shadow-md bg-white text-center"
                    >
                      <div className="text-5xl">📄</div>
                      <p className="font-semibold mt-3">{doc.nombre}</p>
                      <div className="mt-2 space-x-2 text-sm">
                        <a
                          href={`http://localhost:5000/${doc.url_archivo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-black hover:underline"
                        >
                          Ver
                        </a>
                        <a
                          href={`http://localhost:5000/${doc.url_archivo}`}
                          download
                          className="text-green-600 hover:underline"
                        >
                          Descargar
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg relative shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Subir Documento
            </h2>
            <p className="text-sm mb-6 text-gray-600 text-center">
              Seleccione un archivo para subir al sistema.
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoDoc.nombre}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Empresa</label>
                <select
                  name="id_empresa"
                  value={nuevoDoc.id_empresa}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((e) => (
                    <option key={e.id_empresa} value={e.id_empresa}>
                      {e.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Categoría</label>
                <select
                  name="categoria"
                  value={nuevoDoc.categoria}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Contrato">Contrato</option>
                  <option value="Planos">Planos</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Archivo</label>
                <input
                  type="file"
                  onChange={handleArchivo}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
