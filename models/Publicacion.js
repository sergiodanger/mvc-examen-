const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publicacion = sequelize.define('Publicacion', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imagen1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagen2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Publicacion;
