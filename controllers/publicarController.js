const fs = require('fs');
const path = require('path');
const Vehiculo = require('../models/Vehiculo');

exports.mostrarFormulario = (req, res) => {
    res.render('publicar', { title: 'Publicar un Vehículo' });
};

exports.procesarFormulario = (req, res) => {
    const { marca, modelo, combustible, ano, precio,tipo } = req.body;
    const imagen1 = req.files.imagen1[0].filename;
    const imagen2 = req.files.imagen2[0].filename;
    console.log('request body:', req.body);
    const nuevoVehiculo = {
        id: Vehiculo.vehiculos.length + 1,
        Marca: marca,
        Modelo: modelo,
        Combustible: combustible,
        Año: ano,
        Precio: precio,
        Imagen1: imagen1,
        Imagen2: imagen2,
        TipoVehiculo:tipo
    };

    Vehiculo.vehiculos.push(nuevoVehiculo);

    // Escribir el nuevo vehículo en el archivo CSV
    const csvData = `${nuevoVehiculo.id},${marca},${modelo},${combustible},${ano},${precio},${imagen1},${imagen2}\n`;
    fs.appendFile(path.join(__dirname, '../vehiculo.csv'), csvData, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo CSV', err);
            res.status(500).send('Error al procesar la solicitud');
        } else {
            res.redirect('/vehiculos');
        }
    });
};
