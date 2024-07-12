// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('demo', 'root', '2497', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
