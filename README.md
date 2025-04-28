
# Sistema de Gestión para Sosemin Ltda
**Autor:** Eduardo Schettino  
**Profesor Guía:** Barbarita Lara
**Carrera:** Ingeniería en Computación e Informática  
**Fecha de inicio:** Marzo 2025  
**Versión:** 1.3.0

---

## 📌 Descripción del Proyecto

Sistema web diseñado para centralizar la gestión de **cotizaciones, actividades y documentos** de la empresa Sosemin Ltda, con el objetivo de optimizar la administración comercial, técnica y operacional.  
Incluye módulos para la gestión de usuarios, empresas, cotizaciones y actividades, todo protegido mediante autenticación segura.

---

## ⚠️ Problemática Detectada

Actualmente, Sosemin Ltda. realiza procesos de cotización, registro de actividades y gestión de documentos de manera dispersa y manual, lo que genera pérdidas de tiempo, errores en el seguimiento, baja trazabilidad y dificultades en la atención de clientes.  
Se detectó la necesidad de contar con una plataforma centralizada, de fácil acceso, adaptable a las operaciones de la empresa.

---

## 🎯 Objetivos

### Objetivo General
Desarrollar una plataforma web centralizada para la gestión de cotizaciones, actividades y documentos de Sosemin Ltda, mejorando la eficiencia administrativa y la trazabilidad de procesos.

### Objetivos Específicos
- Permitir la gestión integral de usuarios, empresas, cotizaciones y actividades.
- Facilitar la generación de cotizaciones y el seguimiento de actividades programadas.
- Mejorar el control sobre estados de cotizaciones y actividades (pendientes, en progreso, finalizados).
- Asegurar el acceso autorizado mediante roles de usuario (Administrador y Operador).

---

## 🔧 Producto Mínimo Viable (MVP)

- 🧾 Gestión de usuarios y roles (Administrador y Operador).
- 🏢 Gestión de empresas clientes.
- 💵 Creación, edición y eliminación de cotizaciones con detalles de productos.
- 📋 Registro y seguimiento de actividades por empresa y usuario asignado.
- 🔎 Filtros dinámicos para empresas y usuarios en cotizaciones y actividades.
- 🔐 Control de acceso seguro mediante autenticación JWT.
- 📝 Generación de PDF de cotizaciones de manera dinámica.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Frontend:** React.js (Vite + TailwindCSS)
- **Base de Datos:** MySQL
- **Autenticación:** JSON Web Token (JWT)
- **Control de versiones:** Git + GitHub
- **Documentación:** Markdown (README.md)

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Clonar el repositorio**
```bash
git clone https://github.com/Schettino0/ProyectoDeTitulo_Unab_ESchettino.git
cd ProyectoDeTitulo_Unab_ESchettino
```

2. **Instalar dependencias Backend**
```bash
cd backend
npm install
```

3. **Instalar dependencias Frontend**
```bash
cd frontend
npm install
```

4. **Configurar archivos `.env`**
Crear un archivo `.env` en backend con las variables:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=sosemin_db
JWT_SECRET=sosemin_secret_key
```

5. **Levantar el servidor Backend**
```bash
npm run dev
```

6. **Levantar el servidor Frontend**
```bash
npm run dev
```

---

## 📁 Estructura del Proyecto

```
.vscode/
BackEnd/
├── config/
│   └── db.js
├── controllers/
│   ├── actividades.controller.js
│   ├── cotizaciones.controller.js
│   ├── cotizacionesPDF.controller.js
│   ├── empresa.controller.js
│   ├── login.controller.js
│   └── usuarios.controller.js
├── middleware/
│   ├── adminOnly.js
│   └── auth.js
├── models/
│   ├── actividades.model.js
│   ├── cotizacion.model.js
│   ├── detallecotizacion.model.js
│   ├── empresa.model.js
│   └── usuario.model.js
├── routes/
│   ├── actividades.routes.js
│   ├── cotizaciones.routes.js
│   ├── empresa.routes.js
│   └── usuarios.routes.js
├── index.js
├── .env
├── env.example
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── Actividades.jsx
│   │   │   ├── Cotizaciones.jsx
│   │   │   ├── Documentos.jsx
│   │   │   ├── Inicio.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── EditarCotizacion.jsx
│   │   │   ├── editarUsuario.jsx
│   │   │   ├── empresas.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── NuevaActividad.jsx
│   │   │   ├── NuevaCotizacion.jsx
│   │   │   └── usuarios.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── LoginPage.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── router.jsx
├── README.md
├── vite.config.js

```

---

## 🔄 Estado Actual del Proyecto

✔️ Backend operativo con todos los endpoints funcionales, excepto de documentos.  
✔️ Frontend Intuitivo.  
✔️ Módulo de Cotizaciones finalizado (crear, editar, ver, eliminar, PDF).  
✔️ Módulo de Actividades finalizado (crear, editar, ver, completar, filtrar).  
✔️ Control de acceso y roles implementado.  

---

## 📈 Cambios Recientes (v1.3.0)

### 🧩 Finalización de Sprint 4 – Actividades

- Desarrollo completo del módulo de Actividades.
- Listado general con filtros dinámicos por empresa y usuario asignado.
- Modal interno para ver detalles de la actividad.
- Modal interno para editar actividad (título, descripción, prioridad, estado).
- Botón "Completar actividad" implementado para actualizar estado a Finalizado.
- Unificación de Agendar Visita como una actividad estándar.
- Agregado de columna `hora_visita` en base de datos.
- Actualización de modales para capturar hora de visita.

---

## 📘 Licencia

Proyecto académico sin fines comerciales.  
Derechos reservados © Eduardo Schettino, 2025.
