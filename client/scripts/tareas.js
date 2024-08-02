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
const btnTareas = document.querySelector(".btn.tareas");

const renderizarTareas = async () => {
  try{
    let tarea = btnTareas.textContent;
    console.log(tarea);
    btnTareas.textContent="Ocultar"

    const tareas = await obtenerTareas();
    const ul = document.getElementById('lista-tareas');
    ul.innerHTML = '';

    tareas.forEach(tarea, i => {
      const li = document.createElement('li');
      const btnCompleted = tarea.completed ? 'Completada' : 'Incompleta';
      const btnClass = tarea.completed ? 'btn-tareas-completed' : 'btn-tareas-incompleta';
      li.innerHTML = `${tarea.id} ${tarea.name} - ${tarea.description} <button class="${btnClass}" onclick="completar(${i})">${btnCompleted}</button>`;

      ul.appendChild(li);
    });

  } catch (error) {
    console.error('Error al recibir las tareas:', error);
  }
};

const completar = async (i) => {
  try{
     const tareas = await obtenerTareas(),
     const tarea = 
  }
}