import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditarUsuario from "../components/editarUsuario";

export default function Usuarios() {
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "Operador",
    estado: "activo",
  });

  const abrirEdicion = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarEditar(true);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/usuarios", {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios", err);
    }
  };

  const handleAgregar = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.contraseña) {
      alert("Todos los campos deben ser llenados.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nuevoUsuario.correo)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    // Validación de correo existente
    const correoExistente = usuarios.some(usuario => usuario.correo === nuevoUsuario.correo);
    if (correoExistente) {
      alert("El correo ingresado ya está registrado.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/usuarios", nuevoUsuario);
      setNuevoUsuario({
        nombre: "",
        correo: "",
        contraseña: "",
        rol: "Operador",
        estado: "activo",
      });
      cargarUsuarios();
    } catch (err) {
      console.error("Error al agregar usuario", err);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
      cargarUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Agregar Usuario</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Nombre"
            value={nuevoUsuario.nombre}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
            }
            className="border px-2 py-1 rounded"
          />
          <input
            type="email"
            placeholder="Correo"
            value={nuevoUsuario.correo}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })
            }
            className="border px-2 py-1 rounded"
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={nuevoUsuario.contraseña}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })
            }
            className="border px-2 py-1 rounded"
          />
          <select
            value={nuevoUsuario.rol}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
            }
            className="border px-2 py-1 rounded"
          >
            <option value="Operador">Operador</option>
            <option value="Administrador">Administrador</option>
          </select>
          <select
            value={nuevoUsuario.estado}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, estado: e.target.value })
            }
            className="border px-2 py-1 rounded"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button
          onClick={handleAgregar}
          className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Agregar Usuario
        </button>
      </div>
      <div>
        {mostrarEditar && usuarioSeleccionado && (
          <ModalEditarUsuario
            usuario={usuarioSeleccionado}
            onClose={() => setMostrarEditar(false)}
            onSave={cargarUsuarios}
          />
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Listado de Usuarios</h3>
        <div className="overflow-x-auto rounded ">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Nombre</th>
                <th className="px-3 py-2 text-left">Correo</th>
                <th className="px-3 py-2 text-left">Rol</th>
                <th className="px-3 py-2 text-left">Estado</th>
                <th className="px-3 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td className="px-3 py-2">{usuario.nombre}</td>
                  <td className="px-3 py-2">{usuario.correo}</td>
                  <td className="px-3 py-2">{usuario.rol}</td>
                  <td className="px-3 py-2">{usuario.estado}</td>
                  <td className="px-3 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEliminar(usuario.id_usuario)}
                      className="border px-3 py-1 rounded text-sm text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => abrirEdicion(usuario)}
                      className="border px-3 py-1 rounded text-sm hover:bg-gray-900 hover:text-white"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-3 py-2">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
