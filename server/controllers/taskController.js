const TaskModel = require("../models/Task.js");

const taskController = {
  /**
   * Obtiene todas las tareas de la base de datos
   * @route GET /tasks
   * @returns {Array<TaskModel>} 200 - Retorna un array de objetos con las tareas
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getAllTasks: async (req, res) => {
    try {
      const tasks = await TaskModel.findAll();

      return res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting tasks" });
    }
  },

  /**
   * Obtiene una tarea por su id
   * @route GET /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getTaskByName: async (req, res) => {
    try {
      const { nombre } = req.body
      const task = await TaskModel.findByPk(nombre)
      if(!task){
        return res.status(404).json({ message: "No existe dicha tarea" });
      }
      res.json({ message: task });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
  }, 
  
  /**
   * Crea una nueva tarea
   * @route POST /tasks
   * @param {TaskModel} req.body - Datos de la nueva tarea
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea creada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  createTask: async (req, res) => {
    try {
      const { nombre, campo_id, descripcion, completado } = req.body
      const query = "INSERT INTO tarea (nombre, campo_id, descripcion, completado) VALUES (?, ?)"
  
      await promiseQuery(query, [nombre, campo_id, descripcion, completado])
      res.json({message: "tarea creada!!!"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
    res.json({message: "Crear tarea!"})
  }, 
  
  /**
   * Actualiza una tarea
   * @route PUT /tasks/:id
   * @param {TaskModel} req.body - Datos de la tarea a actualizar
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  updateTask: (req, res) => {
    try {
      const {nombre, campo_id, descripcion, completado} = req.body
      const query = "UPDATE tarea SET nombre = ?, WHERE id = ?"
  
      await promiseQuery(query, [nombre, campo_id, descripcion, completado])
      res.json({message: "tarea actualizado exitosamente"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
  }
    res.json({ message: "Update task" });
  }, 

  /**
   * Actualiza el estado 'completed' de una tarea a true / false respectivamente
   * @param {TaskModel} req.query - El id de la tarea a actualizar 
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error 
   */
  completeTask: (req, res) => {

    res.json({message: "Completar tarea"})
  },
  
  /**
   * Elimina una tarea
   * @route DELETE /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea eliminada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  deleteTask: (req, res) => {
    try {
      const query = "DELETE FROM tarea"
  
      await promiseQuery(query, [completado])
      res.json({message: "tarea borrado"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
    res.json({ message: "Delete task" });
  }

module.exports = taskController;