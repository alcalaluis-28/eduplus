// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  cargarCursos();
});

// Cargar cursos desde la API
function cargarCursos() {
  fetch('/api/cursos')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('listaCursos');
      contenedor.innerHTML = '';

      if (!data.length) {
        contenedor.innerHTML = `
          <div class="text-center mt-5">
            <i class="fa-solid fa-circle-info fa-2x mb-2 text-muted"></i>
            <p class="text-muted">No hay cursos registrados</p>
          </div>`;
        return;
      }

      data.forEach(curso => {
        contenedor.innerHTML += `
          <div class="col-md-4">
            <div class="card shadow-sm mb-3">
              <div class="card-body">
                <h5 class="card-title"><i class="fa-solid fa-book"></i> ${curso.titulo}</h5>
                <p class="card-text">
                  <strong>Subcategoría:</strong> ${curso.subcategoria_nombre}<br>
                  <strong>Profesor:</strong> ${curso.docente_nombre || 'Sin asignar'}<br>
                  <strong>Precio:</strong> S/ ${curso.precio}
                </p>
                <button class="btn btn-danger btn-sm" onclick="eliminarCurso(${curso.id_curso})">
                  <i class="fa-solid fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>`;
      });
    })
    .catch(err => console.error('❌ Error al cargar cursos:', err));
}

// Eliminar curso
function eliminarCurso(id) {
  if (!confirm('¿Estás seguro de eliminar este curso?')) return;

  fetch(`/api/cursos/${id}`, { method: 'DELETE' })
    .then(() => cargarCursos())
    .catch(err => console.error('❌ Error al eliminar curso:', err));
}
