// tests/unit/usuarios.controller.test.js
const { crearUsuario } = require('../../controllers/usuarios.controller');
const UsuarioModel = require('../../models/usuario.model');

// Mockear la función del modelo
jest.mock('../../models/usuario.model');

describe('Controlador Usuarios - crearUsuario', () => {

  let req, res;

  beforeEach(() => {
    req = {
      body: {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        contraseña: '123456',
        rol: 'admin'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('Debería crear un usuario exitosamente', async () => {
    // Simula que la inserción fue exitosa
    UsuarioModel.crearUsuario.mockImplementation((usuario, callback) => {
      callback(null, { insertId: 1 });
    });

    await crearUsuario(req, res);

    expect(UsuarioModel.crearUsuario).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario creado exitosamente',
      id: 1
    });
  });

  test('Debería retornar error si faltan campos obligatorios', async () => {
    req.body = { nombre: 'Juan' }; // Faltan campos importantes

    await crearUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Faltan campos obligatorios'
    });
  });

  test('Debería manejar error al crear usuario', async () => {
    UsuarioModel.crearUsuario.mockImplementation((usuario, callback) => {
      callback(new Error('Error en base de datos'), null);
    });

    await crearUsuario(req, res);

    expect(UsuarioModel.crearUsuario).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error al crear usuario'
    });
  });
});
