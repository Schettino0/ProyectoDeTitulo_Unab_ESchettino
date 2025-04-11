CREATE DATABASE IF NOT EXISTS sosemin_db;
USE sosemin_db;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contraseña VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL,
  estado VARCHAR(20) DEFAULT 'activo'
);

-- Tabla de Empresas
CREATE TABLE IF NOT EXISTS empresa (
  id_empresa INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  rut VARCHAR(20),
  correo_contacto VARCHAR(100),
  telefono VARCHAR(50),
  direccion VARCHAR(255)
);

-- Tabla de Cotizaciones
CREATE TABLE IF NOT EXISTS cotizacion (
  id_cotizacion INT PRIMARY KEY AUTO_INCREMENT,
  id_empresa INT,
  fecha_emision DATE,
  fecha_vencimiento DATE,
  estado VARCHAR(50),
  total DECIMAL(12, 2),
  enlace_pago VARCHAR(255),
  FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- Tabla de DetalleCotizacion
CREATE TABLE IF NOT EXISTS detallecotizacion (
  id_detalle INT PRIMARY KEY AUTO_INCREMENT,
  id_cotizacion INT,
  codigo_producto VARCHAR(50),
  nombre_producto VARCHAR(100),
  descripcion TEXT,
  cantidad INT,
  precio_unitario DECIMAL(12, 2),
  unidad VARCHAR(20),
  afecto_impuesto BOOLEAN,
  impuesto VARCHAR(50),
  descuento DECIMAL(5, 2),
  subtotal DECIMAL(12, 2),
  FOREIGN KEY (id_cotizacion) REFERENCES cotizacion(id_cotizacion)
);

-- Tabla de Documentos
CREATE TABLE IF NOT EXISTS documento (
  id_documento INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  tipo_archivo VARCHAR(50),
  categoria VARCHAR(50),
  fecha_subida DATE,
  url_archivo VARCHAR(255),
  id_empresa INT,
  FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- Tabla de Actividades
CREATE TABLE IF NOT EXISTS actividad (
  id_actividad INT PRIMARY KEY AUTO_INCREMENT,
  id_empresa INT,
  titulo VARCHAR(100),
  tipo_actividad VARCHAR(50),
  fecha_programada DATE,
  prioridad VARCHAR(20),
  estado VARCHAR(20),
  descripcion TEXT,
  id_usuario_asignado INT,
  FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa),
  FOREIGN KEY (id_usuario_asignado) REFERENCES usuario(id_usuario)
);