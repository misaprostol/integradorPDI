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
  console.log(descripcion, nombre)
  e.preventDefault()
  const obj={
    nombre, 
    descripcion
  }

  fetch('http://localhost:3000/tasks', {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5500",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(obj)
  })
  .then(res => res.json())
  .then(data => console.log(data))
})

const obtenerTareas = async () => {
  const respuesta = await fetch('http://localhost:3000/tasks', {
    method: 'GET',
    headers : {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5500",
      "Access-Control-Allow-Credentials": true,
    }
  });
  const tareas = await respuesta.json();
  console.log(tareas)
  return tareas;
}

async function renderizarTareas(){
  try{
    let tarea = btnTareas.textContent;
    console.log(tarea);
    btnTareas.textContent="Ocultar"

    const tareas = await obtenerTareas();
    const ul = document.getElementById('lista-tareas');
    ul.innerHTML = '';

    tareas.forEach((tarea, i) => {
      console.log(tarea);
      const li = document.createElement('li');
      const btnDclass = 'btn-delete';
      const btnCompleted = tarea.completado ? 'Completada' : 'Incompleta';
      const btnClass = tarea.completado ? 'btn-tareas-completed' : 'btn-tareas-incompleta';
      li.innerHTML = `${tarea.id} ${tarea.nombre} - ${tarea.descripcion} <button class="${btnDclass} ${tarea.id}">Borrar</button><button class="${btnClass} ${tarea.id}">${btnCompleted}</button>`;
      ul.appendChild(li);
      if(btnCompleted === 'Incompleta'){
        const incompleta = document.querySelectorAll('.btn-tareas-incompleta');
        incompleta.forEach(tarea => tarea.addEventListener('click',completar));
      }else{
        const completado = document.querySelectorAll('.btn-tareas-completed');
        completado.forEach(tarea => tarea.addEventListener('click',completar));
      }
      const btnBorrar = document.querySelectorAll('.btn-delete');
      btnBorrar.forEach(tarea => tarea.addEventListener('click', borrarTarea));
    });
  } catch (error) {
    console.error('Error al recibir las tareas:', error);
  }
}
 
/**
 * Completa la lista <ul> con las tareas obtenidas
 */
const btnTareas = document.querySelector(".btn-tareas");

btnTareas.addEventListener('click', renderizarTareas);

const completar = async (e) => {
  try {
    const id = e.target.classList[1]

    const resultado = await fetch(`http://localhost:3000/tasks/completado/${id}`, {
      method: 'PUT',
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5500",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
      }
    });

    if (!resultado.ok) {
      console.log('Error al completar la tarea');
    }
    
    renderizarTareas();

  } catch (error) {
    console.error('Error al completar la tarea:', error);
  }
};

const borrarTarea = async (e) => {
 try {
    console.log(e.target)

    const id = e.target.classList[1]
 
    const tareaBorrada = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE',
    headers: {"Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5500",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  }}) 

  renderizarTareas();
  
  }
  catch (error){
    console.log('Error al borrar la tarea', error);
 } 
}