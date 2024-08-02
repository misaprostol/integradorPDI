const { Sequelize } = require('sequelize');

const db = new Sequelize('integrador', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Probar la conexión con la DB
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db; //exporto la base de datos para usarla en otros archivos