# 💻 Sistema de Gestión para Sosemin.ltda

<p align="center">
  <img src="./frontend/public/logo.jpg" width="200" alt="Dashboard" />
</p>
Este proyecto consiste en una **plataforma de gestión digital centralizada** para la empresa **Sosemin.ltda**, dedicada a la **cotización**, **mantención** y **fabricación de repuestos industriales**. La aplicación permite la administración de usuarios, empresas y cotizaciones, con **acceso controlado por roles**.

---

## 🧭 Navegación del Sistema

### 🔑 Páginas públicas

| Ruta     | Descripción                |
|----------|----------------------------|
| `/login` | Página de inicio de sesión |

---

### 🔐 Páginas protegidas (requieren autenticación JWT)

| Ruta               | Descripción                                                        |
|--------------------|--------------------------------------------------------------------|
| `/dashboard`       | Página principal tras iniciar sesión. Carga módulos según permisos |
| `Usuarios`         | Panel para ver, editar o eliminar usuarios (solo admin)           |
| `Empresas`         | Panel para gestionar empresas registradas                         |
| `Cotizaciones`     | Listado, creación y edición de cotizaciones                       |
| `Nueva Cotización` | Vista para generar una nueva cotización                           |

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Base de datos**: MySQL
- **Autenticación**: JWT + bcryptjs
- **Otros**: Axios, React Router DOM

---

## ✅ Funcionalidades

### 🔐 Sprint 1 - Autenticación y gestión de usuarios

- Login seguro con JWT
- Registro (solo administradores)
- Encriptación de contraseñas con bcryptjs
- Middleware para protección de rutas según rol

### 👥 Sprint 2 - Gestión de Usuarios y Empresas

- Listado de usuarios con tabla responsiva
- Modales para editar o eliminar usuarios
- Selector de rol y estado
- Panel para ver, agregar y eliminar empresas

### 📦 Sprint 3 - Módulo Cotizaciones (parcial)

- Visualización de cotizaciones con tabla principal
- Modal para ver detalles con productos asociados
- Formulario dinámico para crear nueva cotización
- Edición completa de cotización (empresa, estado, productos)
- Filtro por empresa para listar cotizaciones asociadas
- Validación de productos mínimos
- Totales automáticos (neto, IVA, total)
- Restricción de botones según rol (solo admin puede editar o eliminar)

---

## 🛠️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Schettino0/ProyectoDeTitulo_Unab_ESchettino.git
cd ProyectoDeTitulo_Unab_ESchettino
```

### 2. Iniciar el backend

```bash
cd Backend
npm install
npm run dev
```

### 3. Iniciar el frontend

```bash
cd ../Frontend
npm install
npm run dev
```

### 4. Configuración base de datos

#### Opción 1: MySQL Workbench

1. Abre **MySQL Workbench**.
2. Conéctate a tu servidor local (por ejemplo, usuario `root` y contraseña `schettino`).
3. Abre el archivo `estructura_sosemin.sql`.
4. Ejecuta todo el script para crear la base de datos y sus tablas.

#### Opción 2: Terminal

```bash
mysql -u root -p < estructura_sosemin.sql
```

#### Variables de entorno para conectar el backend

Crea un archivo `.env` dentro del directorio `backend/` con:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=schettino
DB_NAME=sosemin_db
JWT_SECRET=sosemin_secret_key
```

- Crear una base de datos llamada `sosemin_db`
- Ejecutar el script SQL para la estructura de tablas
- Crear un archivo `.env` en el backend con lo siguiente:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=schettino
DB_NAME=sosemin_db
JWT_SECRET=sosemin_secret_key
```

---

## 🧑‍💻 Autor

Eduardo Schettino  
Proyecto de Título – Ingeniería en Computación e Informática  
Universidad Andrés Bello

---

## 📝 Release v1.1.0 – Sprint 2 + avance Sprint 3

### ✨ Nuevas funcionalidades:

- ✅ Gestión de empresas (listar, agregar, eliminar)
- ✅ Gestión de usuarios (listar, agregar, editar, eliminar con modal)
- ✅ Crear cotización con selector de empresa y productos dinámicos
- ✅ Visualización de cotizaciones recientes
- ✅ Modal para editar cotizaciones (cabecera + productos)
- ✅ Filtro por empresa en cotizaciones
- ✅ Validación para evitar cotizaciones vacías
- ✅ Cálculo automático del total
- ✅ Mejora visual con scroll, sticky headers y maquetado elegante
- ✅ Acceso restringido según rol

---

## Imagenes 
### DashBoard Inicio
<p align="center">
  <img src="./frontend/public/Captura de pantalla 2025-04-11 002722.png" width="auto" alt="Dashboard" />
</p>

### Login Inicial
<p align="center">
  <img src="./frontend/public/Captura de pantalla 2025-04-11 002728.png" width="400" alt="Dashboard" />
</p>

### Modulo Cotizaciones
<p align="center">
  <img src="./frontend/public/Captura de pantalla 2025-04-11 002746.png" width="auto" alt="Dashboard" />
</p>

### Modulo Empresas
<p align="center">
  <img src="./frontend/public/Captura de pantalla 2025-04-11 002757.png" width="auto" alt="Dashboard" />
</p>

### Creacion de Cotizacion
<p align="center">
  <img src="./frontend/public/Captura de pantalla 2025-04-11 002815.png" width="auto" alt="Dashboard" />
</p>


---

## 🧑‍💻 Autor

Eduardo Schettino  
Proyecto de Título – Ingeniería en Computación e Informática  
Universidad Andrés Bello

---