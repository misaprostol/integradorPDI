const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir la estructura del Task
const Task = sequelize.define('tareas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    completado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
  timestamps: false
})

Task.sync();

module.exports = Task;