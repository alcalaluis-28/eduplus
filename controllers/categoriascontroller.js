// Categorías – CRUD 
const pool = require('../config/db')
// Crear
exports.crearCategoria = async (req,res)=>{
  const { nombre } = req.body
  if(!nombre) return res.status(400).json({mensaje:'nombre requerido'})
  try{
    const [r] = await pool.query('INSERT INTO categorias(nombre) VALUES (?)',[nombre])
    res.status(201).json({ id_cat:r.insertId, mensaje:'Categoría creada' })
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'categoría ya existe'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Listar
exports.obtenerCategorias = async (_req,res)=>{
  try{ const [rows]=await pool.query('SELECT id_cat,nombre FROM categorias ORDER BY nombre'); res.json(rows) }
  catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Obtener por ID
exports.obtenerCategoriaPorId = async (req,res)=>{
  try{
    const [rows]=await pool.query('SELECT id_cat,nombre FROM categorias WHERE id_cat=?',[req.params.id])
    if(!rows.length) return res.status(404).json({mensaje:'No encontrada'})
    res.json(rows[0])
  }catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Actualizar
exports.actualizarCategoria = async (req,res)=>{
  const { id } = req.params, { nombre } = req.body
  if(!nombre) return res.status(400).json({mensaje:'nombre requerido'})
  try{
    const [r]=await pool.query('UPDATE categorias SET nombre=? WHERE id_cat=?',[nombre,id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrada'})
    res.json({mensaje:'Categoría actualizada'})
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'categoría ya existe'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Eliminar
exports.eliminarCategoria = async (req,res)=>{
  try{
    const [r]=await pool.query('DELETE FROM categorias WHERE id_cat=?',[req.params.id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrada'})
    res.json({mensaje:'Categoría eliminada'})
  }catch(e){ if(e.code==='ER_ROW_IS_REFERENCED_2') return res.status(409).json({mensaje:'tiene subcategorías/cursos asociados'}); res.status(500).json({mensaje:'Error interno'}) }
}
