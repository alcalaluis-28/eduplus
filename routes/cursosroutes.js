const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoscontroller');

// Crear curso
router.post('/', cursoController.crearCurso);

// Listar todos los cursos
router.get('/', cursoController.obtenerCursos);

// Obtener curso por ID
router.get('/:id', cursoController.obtenerCursoPorId);

// Actualizar curso
router.put('/:id', cursoController.actualizarCurso);

// Eliminar curso
router.delete('/:id', cursoController.eliminarCurso);

// Exportar el router
module.exports = router;
