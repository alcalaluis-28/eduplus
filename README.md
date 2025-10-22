# 🎓 Eduplus (Node.js + Express + MySQL)

CRUD de categorías, subcategorías, profesores y cursos. Front con Bootstrap

     🚀 1. Clonar el repositorio

Clona el repositorio usando el siguiente comando:

```
https://github.com/alcalaluis-28/eduplus.git
```
```
🔐 2) Configurar .env
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=eduplus
DB_PORT=3306
```
🗄️ 3) Restaurar la base de datos (MySQL)

Ejecuta en tu cliente MySQL (SQLyog, Workbench, CLI).
```bash
-- Crear BD con UTF-8
CREATE DATABASE IF NOT EXISTS eduplus
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE eduplus;

-- Tablas
CREATE TABLE categorias (
  id_cat INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE subcategorias (
  id_sub INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_cat INT UNSIGNED NOT NULL,
  nombre VARCHAR(80) NOT NULL,
  UNIQUE KEY uq_subcat (id_cat, nombre),
  CONSTRAINT fk_subcat_cat FOREIGN KEY (id_cat)
    REFERENCES categorias(id_cat)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE profesores (
  id_doc INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(120),
  UNIQUE KEY uq_doc_email (email)
) ENGINE=InnoDB;

CREATE TABLE cursos (
  id_curso INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL,
  descripcion TEXT,
  fecha_inicio DATE,
  fecha_fin DATE,
  duracion_h INT UNSIGNED,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  id_sub INT UNSIGNED NOT NULL,
  id_doc INT UNSIGNED NULL,
  UNIQUE KEY uq_curso (id_sub, titulo),
  KEY idx_curso_sub (id_sub),
  KEY idx_curso_doc (id_doc),
  CONSTRAINT fk_curso_sub FOREIGN KEY (id_sub)
    REFERENCES subcategorias(id_sub)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_curso_doc FOREIGN KEY (id_doc)
    REFERENCES profesores(id_doc)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- Semilla
INSERT INTO categorias (nombre) VALUES ('Informática'), ('Matemáticas');
INSERT INTO subcategorias (id_cat, nombre) VALUES (1,'Lenguajes'), (1,'BD'), (2,'Geometría');
INSERT INTO profesores (nombres, apellidos, email) VALUES ('Juan','Tandaña','juan@eduplus.pe');
INSERT INTO cursos (titulo, descripcion, fecha_inicio, fecha_fin, duracion_h, precio, id_sub, id_doc) VALUES
('Python Básico','Intro a Python','2025-11-10','2025-12-20',40,100.00,1,1),
('SQLite','Bases de datos ligeras','2025-11-15','2025-12-15',30,60.00,2,1),
('Geometría I','Ángulos y triángulos','2025-11-05','2025-12-05',32,40.00,3,1);
```
🖥️ 4) Ejecutar el servidor

Con nodemon:
```
npm install -g nodemon
```
O con node:
```
nodemon server.js
```
🌐 5) Front-end rápido
```
public/index.html: panel de administración (CRUD).
```
🧪 6) Probar con Thunder Client (VSCode)

Instala “Thunder Client”.
```
Crea requests:

GET http://localhost:3000/api/cursos

POST http://localhost:3000/api/cursos (Body JSON como arriba)

DELETE http://localhost:3000/api/cursos/1
```
👨‍🏫 Recursos
```

MySQL / SQLyog / Workbench para DB

Thunder Client para testear HTTP

VSCode + Nodemon para desarrollo rápido