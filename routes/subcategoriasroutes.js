const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriascontroller');

// Crear subcategoría
router.post('/', subcategoriaController.crearSubcategoria);

// Listar todas las subcategorías
router.get('/', subcategoriaController.obtenerSubcategorias);

// Obtener subcategoría por ID
router.get('/:id', subcategoriaController.obtenerSubcategoriaPorId);

// Actualizar subcategoría
router.put('/:id', subcategoriaController.actualizarSubcategoria);

// Eliminar subcategoría
router.delete('/:id', subcategoriaController.eliminarSubcategoria);

// Exportar el router
module.exports = router;
