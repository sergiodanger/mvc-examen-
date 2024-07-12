// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mi_proyecto', 'Sergio', 'elianette1', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
