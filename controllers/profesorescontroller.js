// Profesores – CRUD
const pool = require('../config/db')

// Crear
exports.crearProfesor = async (req,res)=>{
  const { nombres, apellidos, email } = req.body
  if(!nombres || !apellidos) return res.status(400).json({mensaje:'nombres y apellidos requeridos'})
  try{
    const [r]=await pool.query('INSERT INTO profesores(nombres,apellidos,email) VALUES (?,?,?)',[nombres,apellidos,email||null])
    res.status(201).json({ id_doc:r.insertId, mensaje:'Profesor creado' })
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'email ya existe'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Listar
exports.obtenerProfesores = async (_req,res)=>{
  try{ const [rows]=await pool.query('SELECT id_doc,nombres,apellidos,email FROM profesores ORDER BY apellidos,nombres'); res.json(rows) }
  catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Obtener por ID
exports.obtenerProfesorPorId = async (req,res)=>{
  try{
    const [rows]=await pool.query('SELECT id_doc,nombres,apellidos,email FROM profesores WHERE id_doc=?',[req.params.id])
    if(!rows.length) return res.status(404).json({mensaje:'No encontrado'})
    res.json(rows[0])
  }catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Actualizar
exports.actualizarProfesor = async (req,res)=>{
  const { id } = req.params; const { nombres, apellidos, email } = req.body
  if(!nombres || !apellidos) return res.status(400).json({mensaje:'nombres y apellidos requeridos'})
  try{
    const [r]=await pool.query('UPDATE profesores SET nombres=?,apellidos=?,email=? WHERE id_doc=?',[nombres,apellidos,email||null,id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrado'})
    res.json({mensaje:'Profesor actualizado'})
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'email ya existe'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Eliminar
exports.eliminarProfesor = async (req,res)=>{
  try{
    const [r]=await pool.query('DELETE FROM profesores WHERE id_doc=?',[req.params.id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrado'})
    res.json({mensaje:'Profesor eliminado'})
  }catch(e){ if(e.code==='ER_ROW_IS_REFERENCED_2') return res.status(409).json({mensaje:'hay cursos que lo usan'}); res.status(500).json({mensaje:'Error interno'}) }
}
