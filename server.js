// Cargar variables de entorno
require('dotenv').config()

// Mensaje de control al iniciar
console.log('Archivo server.js ejecutándose...')

// Importar dependencias principales
const express = require('express')

// Importar rutas de Eduplus
const categoriasRoutes     = require('./routes/categoriasroutes')
const subcategoriasRoutes  = require('./routes/subcategoriasroutes')
const profesoresRoutes     = require('./routes/profesoresroutes')
const cursosRoutes         = require('./routes/cursosroutes')

// Importar pool de conexión a la BD
const pool = require('./config/db')

// Inicializar la aplicación Express
const app = express()

// Definir el puerto del servidor (por .env o por defecto 3000)
const PORT = process.env.PORT || 3000

// Middleware para procesar datos en formato JSON
app.use(express.json())
console.log('✅ Server cargando...')

// Servir archivos estáticos de la carpeta public
app.use(express.static('public'));


// Middleware de traza para cada grupo de rutas
app.use('/api/categorias',    (req, _res, next) => { console.log('📡 /api/categorias');    next() })
app.use('/api/subcategorias', (req, _res, next) => { console.log('📡 /api/subcategorias'); next() })
app.use('/api/profesores',    (req, _res, next) => { console.log('📡 /api/profesores');    next() })
app.use('/api/cursos',        (req, _res, next) => { console.log('📡 /api/cursos');        next() })

// Rutas principales de la API
app.use('/api/categorias',    categoriasRoutes)
app.use('/api/subcategorias', subcategoriasRoutes)
app.use('/api/profesores',    profesoresRoutes)
app.use('/api/cursos',        cursosRoutes)

// Ruta de prueba para verificar que Express responde
app.get('/', (_req, res) => {
  res.send('Servidor Eduplus funcionando correctamente')
})

// ✅ Verificar conexión a la base de datos al iniciar
pool.query('SELECT 1')
  .then(() => console.log('✅ Conexión a la base de datos correcta'))
  .catch(err => console.error('❌ Error de conexión a la BD:', err))

// Iniciar el servidor y escuchar en el puerto indicado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`)
})
