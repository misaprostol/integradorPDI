/**
 * Obtiene las tareas de la base de datos
 * @returns {Array[Object]} - Un listado de tareas
 */
const obtenerTareas = async () => {
  const respuesta = await fetch('http://localhost:3000/tasks', {
    method: 'GET'
  });
  const tareas = await respuesta.json();
  
  return tareas;
}

/**
 * Completa la lista <ul> con las tareas obtenidas
 */
const renderizarTareas = async () => {
  // Obtener tareas
  const tareas = await obtenerTareas();

  // Seleccionar el elemento <ul> en el DOM
  const listaTareas = document.getElementById('lista-tareas');

  // Limpiar la lista actual
  listaTareas.innerHTML = '';

  // Iterar sobre las tareas y crear elementos <li>
  tareas.forEach(tarea => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${tarea.name}: ${tarea.description} - ${tarea.completed ? 'true' : 'false'}
      <button class="completar-tarea" data-id="${tarea.id}">${tarea.completed ? 'Desmarcar' : 'Completar'}</button>
      <button class="borrar-tarea" data-id="${tarea.id}">Borrar</button>
      <button class="actualizar-tarea" data-id="${tarea.id}">Actualizar</button>
    `;
    listaTareas.appendChild(li);
  });

  // Agregar eventos a los botones
  document.querySelectorAll('.completar-tarea').forEach(button => {
    button.addEventListener('click', completarTarea);
  });

  document.querySelectorAll('.borrar-tarea').forEach(button => {
    button.addEventListener('click', borrarTarea);
  });

  document.querySelectorAll('.actualizar-tarea').forEach(button => {
    button.addEventListener('click', actualizarTarea);
  });
}

// Evento para manejar el envío del formulario
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(formulario);
  const data = {
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    completed: formData.get('completed') === 'true'
  };

  // Llamar a renderizarTareas para actualizar la lista de tareas
  renderizarTareas();
});

// Función para completar una tarea
const completarTarea = async (event) => {
  const id = event.target.dataset.id;
  const tarea = await obtenerTareaPorId(id);
  const updatedData = { ...tarea, completed: !tarea.completed };

  renderizarTareas();
}

// Función para borrar una tarea
const borrarTarea = async (event) => {
  const id = event.target.dataset.id;

  renderizarTareas();
}

// Función para actualizar una tarea
const actualizarTarea = async (event) => {
  const id = event.target.dataset.id;
  const newName = prompt('Ingrese el nuevo nombre de la tarea:');
  const tarea = await obtenerTareaPorId(id);
  const updatedData = { ...tarea, name: newName };

  renderizarTareas();
}

// Función para obtener una tarea por su ID
const obtenerTareaPorId = async (id) => {
  const respuesta = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'GET'
  });
  const tarea = await respuesta.json();

  return tarea;
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarTareas();

  // Agregar evento al botón de renderizar tareas
  const btnRenderizarTareas = document.getElementById('btn-renderizar-tareas');
  btnRenderizarTareas.addEventListener('click', async () => {
    await renderizarTareas();
  });

  // Este es el envío del formulario
  const formulario = document.getElementById('formulario');
  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formulario);
    const data = {
      id: formData.get('id'),
      name: formData.get('name'),
      description: formData.get('description'),
      completed: formData.get('completed') === 'true'
    };

    // Llamar a renderizarTareas para actualizar la lista de tareas
    await renderizarTareas();
  });
  
});
