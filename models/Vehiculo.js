const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('../models/Usuario');

const Vehiculo = sequelize.define('Vehiculo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Combustible: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TipoVehiculo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Año: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Precio: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true
    },
    Imagen1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Imagen2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    usuario_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    timestamps: false
});


Usuario.hasMany(Vehiculo, { foreignKey: 'usuario_id' });
Vehiculo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
module.exports = Vehiculo;
