const Task = require("../models/Task.js");

const taskController = {
  /**
   * Obtiene todas las tareas de la base de datos
   * @route GET /tasks
   * @returns {Array<TaskModel>} 200 - Retorna un array de objetos con las tareas
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll();

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
  getTaskById: async (req, res) => {
    try {
      const { id } = req.params
      const task = await Task.findByPk(id)
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
      const { nombre, descripcion } = req.body
      
      if(!nombre){
        return res.status(401).json({error: "El campo nombre esta vacio"})
      }
      if(!descripcion){
        return res.status(401).json({error: "El campo descripcion esta vacio"})
      }

      const nuevaTask = await Task.create({nombre, descripcion})
      nuevaTask.save()
      res.status(200).json(nuevaTask)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
  }, 
  
  /**
   * Actualiza una tarea
   * @route PUT /tasks/:id
   * @param {TaskModel} req.body - Datos de la tarea a actualizar
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  updateTask: async (req, res) => { {
    try {
      const {nombre, descripcion, completado} = req.body
      const { id } = req.params

      const task = await Task.findByPk(id)

      if(!task){
        return res.status(404).json({ message: "No existe dicha tarea" });
      }

      if(!nombre){
        return res.status(401).json({error: "El campo nombre esta vacio"})
      }
      if(!descripcion){
        return res.status(401).json({error: "El campo descripcion esta vacio"})
      }

     const actualizarTask =  await Task.update({nombre, descripcion, completado}, {where:{id}})
     res.status(200).json(await Task.findByPk(id))
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
  }
  }, 

  /**
   * Actualiza el estado 'completed' de una tarea a true / false respectivamente
   * @param {TaskModel} req.query - El id de la tarea a actualizar 
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea actualizada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error 
   */
  completeTask: async (req, res) => {
    try {
      const {id} = req.params
      const completed = await Task.findOne({where : {id}, attributes : ["completado"]})
      const taskcomplete = !completed.dataValues.completado

      if (taskcomplete === null){
        return res.status(404).json({ message: "No existe dicha tarea" });
      }

      const task = await Task.update({completado: taskcomplete}, {where:{id}})
      res.status(200).json(taskcomplete) 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }
  },
    

  /**
   * Elimina una tarea
   * @route DELETE /tasks/:id
   * @returns {TaskModel} 200 - Retorna un objeto con la tarea eliminada
   * @returns {Error} 500 - Retorna un objeto con el mensaje de error
   */
  deleteTask: async (req, res) => {
    try {
      const {id} = req.params
      const task = await Task.findByPk(id)

      if(!task){
        return res.status(404).json({ message: "No existe dicha tarea" });
      }
  
      const borrarTask = await Task.destroy({where:{id}} )
      res.status(200).json(borrarTask)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error getting task" });
    }

  },
}
module.exports = taskController;