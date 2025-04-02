const soloAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'administrador') {
      return res.status(403).json({ error: 'Acceso denegado. No tienes permisos de administrador.' });
    }
    next();
  };
  
  module.exports = soloAdmin;
  