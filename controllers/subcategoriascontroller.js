// Subcategorías – CRUD 
const pool = require('../config/db')

// Crear
exports.crearSubcategoria = async (req,res)=>{
  const { nombre, id_cat } = req.body
  if(!nombre || !id_cat) return res.status(400).json({mensaje:'nombre e id_cat requeridos'})
  try{
    const [r]=await pool.query('INSERT INTO subcategorias(nombre,id_cat) VALUES (?,?)',[nombre,id_cat])
    res.status(201).json({ id_sub:r.insertId, mensaje:'Subcategoría creada' })
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'duplicada en la misma categoría'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Listar
exports.obtenerSubcategorias = async (_req,res)=>{
  const SQL=`SELECT s.id_sub,s.nombre,s.id_cat,c.nombre AS categoria_nombre
             FROM subcategorias s JOIN categorias c ON c.id_cat=s.id_cat
             ORDER BY c.nombre,s.nombre`
  try{ const [rows]=await pool.query(SQL); res.json(rows) }catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Obtener por ID
exports.obtenerSubcategoriaPorId = async (req,res)=>{
  const SQL=`SELECT s.id_sub,s.nombre,s.id_cat,c.nombre AS categoria_nombre
             FROM subcategorias s JOIN categorias c ON c.id_cat=s.id_cat
             WHERE s.id_sub=?`
  try{
    const [rows]=await pool.query(SQL,[req.params.id])
    if(!rows.length) return res.status(404).json({mensaje:'No encontrada'})
    res.json(rows[0])
  }catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Actualizar
exports.actualizarSubcategoria = async (req,res)=>{
  const { id } = req.params, { nombre, id_cat } = req.body
  if(!nombre || !id_cat) return res.status(400).json({mensaje:'campos requeridos'})
  try{
    const [r]=await pool.query('UPDATE subcategorias SET nombre=?, id_cat=? WHERE id_sub=?',[nombre,id_cat,id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrada'})
    res.json({mensaje:'Subcategoría actualizada'})
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'duplicada en la misma categoría'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Eliminar
exports.eliminarSubcategoria = async (req,res)=>{
  try{
    const [r]=await pool.query('DELETE FROM subcategorias WHERE id_sub=?',[req.params.id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrada'})
    res.json({mensaje:'Subcategoría eliminada'})
  }catch(e){ if(e.code==='ER_ROW_IS_REFERENCED_2') return res.status(409).json({mensaje:'tiene cursos asociados'}); res.status(500).json({mensaje:'Error interno'}) }
}
