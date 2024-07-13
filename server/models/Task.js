const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Definir la estructura del Task
const Task = sequelize.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(25),
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    completado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
  timestamps: false
})

Task.sync();

module.exports = Task;