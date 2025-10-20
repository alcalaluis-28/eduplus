const express = require('express');
const router = express.Router();
const profesorController = require('../controllers/profesorescontroller');

// Crear profesor
router.post('/', profesorController.crearProfesor);

// Listar todos los profesores
router.get('/', profesorController.obtenerProfesores);

// Obtener profesor por ID
router.get('/:id', profesorController.obtenerProfesorPorId);

// Actualizar profesor
router.put('/:id', profesorController.actualizarProfesor);

// Eliminar profesor
router.delete('/:id', profesorController.eliminarProfesor);

// Exportar el router
module.exports = router;
