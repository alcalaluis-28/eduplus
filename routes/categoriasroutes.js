const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriascontroller');

// Crear categoría
router.post('/', categoriaController.crearCategoria);

// Listar todas las categorías
router.get('/', categoriaController.obtenerCategorias);

// Obtener categoría por ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// Actualizar categoría
router.put('/:id', categoriaController.actualizarCategoria);

// Eliminar categoría
router.delete('/:id', categoriaController.eliminarCategoria);

// Exportar el router
module.exports = router;
