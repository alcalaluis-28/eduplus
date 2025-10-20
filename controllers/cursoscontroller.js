// Cursos – CRUD
const pool = require('../config/db')

const SELECT = `
SELECT  c.id_curso, c.titulo, c.descripcion, c.fecha_inicio, c.fecha_fin,
        c.duracion_h AS duracion_horas, c.precio,
        sc.id_sub AS subcategoria_id, sc.nombre AS subcategoria_nombre,
        ct.id_cat AS categoria_id, ct.nombre AS categoria_nombre,
        p.id_doc AS docente_id, CONCAT_WS(' ',p.nombres,p.apellidos) AS docente_nombre
FROM cursos c
JOIN subcategorias sc ON sc.id_sub=c.id_sub
JOIN categorias ct    ON ct.id_cat=sc.id_cat
LEFT JOIN profesores p ON p.id_doc=c.id_doc`

// Crear
exports.crearCurso = async (req,res)=>{
  const b=req.body
  const titulo=(b.titulo||'').trim()
  const id_sub=Number(b.subcategory_id ?? b.id_sub)
  const id_doc=b.docente_id ?? b.profesor_id ?? b.id_doc ?? null
  const dur=Number(b.duracion_horas ?? b.duracion_h ?? 0)
  const precio=Number(b.precio ?? 0)
  if(!titulo || !id_sub) return res.status(400).json({mensaje:'Faltan: titulo y subcategory_id'})
  const SQL=`INSERT INTO cursos(titulo,descripcion,fecha_inicio,fecha_fin,duracion_h,precio,id_sub,id_doc)
             VALUES (?,?,?,?,?,?,?,?)`
  try{
    const [r]=await pool.query(SQL,[titulo,b.descripcion||null,b.fecha_inicio||null,b.fecha_fin||null,dur,precio,id_sub,id_doc])
    res.status(201).json({ id_curso:r.insertId, mensaje:'Curso creado' })
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'curso duplicado en la misma subcategoría'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Listar
exports.obtenerCursos = async (_req,res)=>{
  try{ const [rows]=await pool.query(SELECT+' ORDER BY c.id_curso DESC'); res.json(rows) }
  catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Obtener por ID
exports.obtenerCursoPorId = async (req,res)=>{
  try{
    const [rows]=await pool.query(SELECT+' WHERE c.id_curso=?',[req.params.id])
    if(!rows.length) return res.status(404).json({mensaje:'No encontrado'})
    res.json(rows[0])
  }catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}

// Actualizar (parcial)
exports.actualizarCurso = async (req,res)=>{
  const { id }=req.params, b=req.body
  const parts=[], vals=[]
  if(b.titulo!==undefined){ parts.push('titulo=?'); vals.push((b.titulo||'').trim()) }
  if(b.descripcion!==undefined){ parts.push('descripcion=?'); vals.push(b.descripcion||null) }
  if(b.fecha_inicio!==undefined){ parts.push('fecha_inicio=?'); vals.push(b.fecha_inicio||null) }
  if(b.fecha_fin!==undefined){ parts.push('fecha_fin=?'); vals.push(b.fecha_fin||null) }
  if(b.duracion_horas!==undefined || b.duracion_h!==undefined){ parts.push('duracion_h=?'); vals.push(Number(b.duracion_horas ?? b.duracion_h ?? 0)) }
  if(b.precio!==undefined){ parts.push('precio=?'); vals.push(Number(b.precio ?? 0)) }
  if(b.subcategory_id!==undefined || b.id_sub!==undefined){ parts.push('id_sub=?'); vals.push(Number(b.subcategory_id ?? b.id_sub)) }
  if(b.docente_id!==undefined || b.profesor_id!==undefined || b.id_doc!==undefined){ parts.push('id_doc=?'); vals.push(b.docente_id ?? b.profesor_id ?? b.id_doc ?? null) }
  if(!parts.length) return res.status(400).json({mensaje:'Nada que actualizar'})
  const SQL=`UPDATE cursos SET ${parts.join(', ')} WHERE id_curso=?`; vals.push(id)
  try{
    const [r]=await pool.query(SQL,vals)
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrado'})
    res.json({mensaje:'Curso actualizado'})
  }catch(e){ if(e.code==='ER_DUP_ENTRY') return res.status(409).json({mensaje:'curso duplicado en la misma subcategoría'}); res.status(500).json({mensaje:'Error interno'}) }
}

// Eliminar
exports.eliminarCurso = async (req,res)=>{
  try{
    const [r]=await pool.query('DELETE FROM cursos WHERE id_curso=?',[req.params.id])
    if(!r.affectedRows) return res.status(404).json({mensaje:'No encontrado'})
    res.json({mensaje:'Curso eliminado'})
  }catch(e){ res.status(500).json({mensaje:'Error interno'}) }
}
