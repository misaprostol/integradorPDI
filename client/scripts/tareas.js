/**
 * Obtiene las tareas de la base de datos
 * @returns {Array[Object]} - Un listado de tareas
 */

const btnForm = document.querySelector(".btn-form");

btnForm.addEventListener('click', function(e){
  let nombre = document.getElementById('nombre').value
  // nombre = JSON.stringify(nombre);
  let descripcion = document.getElementById('descripcion').value
  // descripcion = JSON.stringify(descripcion);
  console.log(typeof(descripcion))
  e.preventDefault()

  fetch('http://localhost:3000/tasks', {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    },
    body: nombre, descripcion
  })
  .then(res => res.json())
  .then(data => console.log(data))
})

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
const btnTareas = document.querySelector(".btn-tareas");

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
  try {
    const tareas = await obtenerTareas();
    const tarea = tareas[i];
    const estadoTarea = !tarea.completed;

    const datos = {
      completed: estadoTarea
    };

    const resultado = await fetch(`http://localhost:3000/tasks/${tarea.id}`, {
      method: 'PUT',
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
      },
      body: JSON.stringify(datos),
    });

    if (!resultado.ok) {
      console.log('Error al completar la tarea');
    }
    
    tarea.completed = estadoTarea;

    renderizarTareas();

  } catch (error) {
    console.error('Error al completar la tarea:', error);
  }
};

btnTareas.addEventListener("click", renderizarTareas);


