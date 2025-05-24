# Sistema de Gestión para Sosemin Ltda
**Autor:** Eduardo Schettino  
**Profesor Guía:** Barbarita Lara  
**Carrera:** Ingeniería en Computación e Informática  
**Fecha de inicio:** Marzo 2025  
**Versión:** 1.4.2

---

## 📌 Descripción del Proyecto

Sistema web diseñado para centralizar la gestión de **cotizaciones, actividades y documentos** de la empresa Sosemin Ltda.  
Su objetivo es optimizar los procesos comerciales y técnicos mediante módulos integrados y un entorno seguro para usuarios con diferentes roles.

---

## ⚠️ Problemática Detectada

Sosemin Ltda. gestionaba sus procesos de cotización, actividades y documentación en plataformas aisladas, generando duplicidad de información, bajo control y dificultades de seguimiento.  
El proyecto resuelve esta problemática con una solución digital centralizada, accesible desde cualquier lugar.

---

## 🎯 Objetivos

### Objetivo General
Desarrollar una plataforma web centralizada que permita la gestión eficiente de cotizaciones, actividades y documentos en Sosemin Ltda.

### Objetivos Específicos
- Centralizar en un solo sistema las funciones operativas clave de la empresa.
- Permitir la trazabilidad de cotizaciones y actividades asociadas a cada empresa.
- Incorporar roles de usuario con restricciones según permisos.
- Permitir la subida, clasificación y descarga de documentos por empresa y categoría.

---

## 🔧 Producto Mínimo Viable (MVP)

- 🧾 Gestión de usuarios y autenticación con roles (Admin / Operador).
- 💼 Módulo de empresas con creación y edición.
- 💸 Módulo de cotizaciones (crear, editar, eliminar, PDF).
- 📋 Módulo de actividades (agendar, ver, completar).
- 📂 Módulo de documentos (subir, listar, filtrar, eliminar).
- 🔐 Control de acceso mediante JWT.
- 🧠 Navegación intuitiva tipo dashboard.
- 🧪 Pruebas unitarias y de integración de los principales módulos.
- 🎓 Tour guiado en la sección de cotizaciones.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** React.js (Vite + TailwindCSS)
- **Base de datos:** MySQL
- **Autenticación:** JSON Web Token (JWT)
- **Subida de archivos:** Multer
- **PDF dinámico:** html-pdf / dom-to-pdf
- **Testing:** Jest + Supertest
- **Tours:** Intro.js
- **Control de versiones:** Git + GitHub

---

## 🚀 Cómo Ejecutar el Proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/Schettino0/ProyectoDeTitulo_Unab_ESchettino.git
cd ProyectoDeTitulo_Unab_ESchettino

# 2. Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# 3. Configurar archivos .env
# Backend .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=sosemin_db
JWT_SECRET=sosemin_secret_key

# 4. Ejecutar servidores
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

---

## 📁 Estructura del Proyecto (v1.4.2 resumida)

```
backend/
├── controllers/
│   ├── actividades.controller.js
│   ├── cotizaciones.controller.js
│   ├── documentos.controller.js
│   └── usuarios.controller.js
├── models/
├── routes/
├── middleware/
│   └── multer.js
├── config/
├── tests/
│   ├── cotizaciones.test.js
│   ├── documentos.test.js
│   └── login.test.js
└── index.js

frontend/
├── src/
│   ├── components/dashboard/
│   │   ├── Documentos.jsx
│   │   ├── Cotizaciones.jsx
│   │   ├── Actividades.jsx
│   ├── components/
│   │   └── TourIntroCotizaciones.jsx
│   └── pages/
│       └── Dashboard.jsx
```

---

## 📦 Cambios Recientes — Release v1.4.2

### ✅ Pruebas y Tour

- Añadidas pruebas unitarias e integración para cotizaciones, documentos, login, empresas y usuarios.
- Tour guiado para la sección de cotizaciones usando Intro.js.
- Todos los tests cubren rutas clave de `POST`, `GET`, `PUT`, `DELETE`.

---

## 🔒 Seguridad y Roles

- Los documentos pueden ser subidos por cualquier usuario autenticado.
- Sólo los administradores pueden eliminar registros.
- El dashboard detecta el tipo de rol y limita el acceso visual y funcional.

---

## 📘 Licencia

Proyecto académico con fines evaluativos.  
Todos los derechos reservados © Eduardo Schettino, 2025.
