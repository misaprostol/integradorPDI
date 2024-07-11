/**
 * Obtiene las tareas de la base de datos
 * @returns {Array[Object]} - Un listado de tareas
 */
const obtenerTareas = async () => {
    const respuesta = await fetch('http://localhost:3000/tasks', {
      method: 'GET'
    })
    const tareas = await respuesta.json()
  
    return tareas
  }
  
  /**
   * Completa la lista <ul> con las tareas obtenidas
   */
  const renderizarTareas = async () => {
    // Obtener tareas
    const tareas = await obtenerTareas();

    // Seleccionar el elemento <ul> en el DOM
    const listaTareas = document.getElementById('lista-tareas')

    // Limpiar la lista actual
    listaTareas.innerHTML = '';

    // Iterar sobre las tareas y crear elementos <li>
    tareas.forEach(tarea => {
      const li = document.createElementNS('li');
      li.textContent = `${tarea.name}: ${tarea.description}`
      listaTareas.appendChild(li)
    });}

  // Evento para manejar el envío del formulario
  const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(formulario)
    const data = {
    name: formData.get('name'),
    description: formData.get('description')
  }

  // Enviar los datos al servidor
    await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  // Llamar a renderizarTareas para actualizar la lista de tareas
  renderizarTareas()
})

// Llamar a renderizarTareas para mostrar las tareas cuando se carga la página
renderizarTareas()