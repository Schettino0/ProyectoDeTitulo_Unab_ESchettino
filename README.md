# 💻 Sistema de Gestión para Sosemin.ltda

Este proyecto consiste en una **plataforma de gestión digital centralizada** para la empresa **Sosemin.ltda**, dedicada a la cotización, mantención y fabricación de repuestos industriales. La aplicación incluye funcionalidades de gestión de usuarios, empresas, cotizaciones, pagos y actividades, con acceso diferenciado por roles. Es el resultado del desarrollo del Sprint 1 del proyecto de título.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: MySQL
- **Autenticación**: JWT + bcryptjs
- **Otros**: Axios, React Router DOM

---

## 🧠 Funcionalidades del Sprint 1

### 🔐 Autenticación y gestión de usuarios
- Inicio de sesión con token JWT
- Registro de nuevos usuarios (solo administrador)
- Protección de rutas según rol (empleado / administrador)
- Encriptación de contraseñas con bcryptjs

### 👥 Administración de usuarios (solo administrador)
- Vista tipo tabla con todos los usuarios
- Botón para editar (con modal moderno)
- Botón para eliminar
- Selector de rol y estado en formulario de registro y edición

### 🧩 API RESTful (backend)
- Crear usuario
- Login
- Listar todos los usuarios
- Editar usuario
- Eliminar usuario

### 🎨 Frontend estructurado
- Rutas protegidas con `AdminRoute` y `useAuth`
- Páginas:
  - Login
  - Registro
  - Dashboard
  - Administración de usuarios
- Estilos limpios y responsivos con Tailwind CSS

---

## 🧭 Navegación del sistema

### 🔑 Páginas públicas

| Ruta     | Descripción                      |
|----------|----------------------------------|
| `/login` | Página de inicio de sesión       |

---

### 🔐 Páginas protegidas (requieren token)

| Ruta         | Descripción                                                                 |
|--------------|-----------------------------------------------------------------------------|
| `/dashboard` | Página de inicio tras login. Redirecciona según permisos                   |
| `/register`  | Registro de nuevos usuarios (solo administradores)                         |
| `/usuarios`  | Panel de administración de usuarios: ver, editar y eliminar (solo admins)  |

---

## 🛠️ Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/usuario/sistema-sosemin.git
cd sistema-sosemin
```

### 2. Iniciar backend

```bash
cd backend
npm install
npm run dev
```

### 3. Iniciar frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Base de datos

- Crear base de datos `sosemin_db`
- Ejecutar el script SQL con la estructura de tablas
- Configurar `.env` en el backend con credenciales de tu entorno local

---

## 🧑‍💻 Autor

Eduardo Schettino — Proyecto de Título (Ingeniería en Computación e Informática)
