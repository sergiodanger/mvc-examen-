const Vehiculo = require('../models/Vehiculo');
const { Op } = require('sequelize');

exports.listarVehiculos = async (req, res) => {
    try {
        let vehiculos;
        const esAdmin = req.session.user ? req.session.user.is_admin : false;

        if (req.session.user) {
            const usuario_id = req.session.user.user_id;
            vehiculos = await Vehiculo.findAll({ where: { usuario_id } });
        } else {
            vehiculos = await Vehiculo.findAll();
        }

        res.render('vehiculos', { title: 'Vehículos', vehiculos, esAdmin, user: req.session.user });
    } catch (error) {
        console.log("Error al listar los vehículos:", error);
        res.status(500).send('Error al listar los vehículos.');
    }
};



exports.getVehiculoByIdUpdate = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json(vehiculo);
    } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        res.status(500).json({ error: 'Error interno al obtener el vehículo' });
    }
};

exports.getVehiculoById = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        if (!vehiculo) {
            return res.status(404).send('Vehículo no encontrado');
        }
        res.render('vehiculo', { title: 'Detalles del Vehículo', vehiculo });
    } catch (error) {
        res.status(500).send('Error al obtener el vehículo');
    }
};
exports.searchVehiculos = async (req, res) => {
    try {
        const query = req.query.query.toLowerCase();
        let whereClause = {
            [Op.or]: [
                { Marca: { [Op.like]: `%${query}%` } },
                { Modelo: { [Op.like]: `%${query}%` } }
            ]
        };

        // Si hay una sesión de usuario activa, añade la condición de usuario_id
        if (req.session.user) {
            const usuario_id = req.session.user.user_id;
            whereClause.usuario_id = usuario_id;
        }

        const results = await Vehiculo.findAll({ where: whereClause });
        res.json(results);
    } catch (error) {
        console.log("Error al buscar vehículos:", error);
        res.status(500).send('Error al buscar vehículos');
    }
};

exports.updateVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        if (!vehiculo) {
            return res.status(404).send('Vehículo no encontrado');
        }
        console.log('request body:', req.body);
        await vehiculo.update(req.body);

        res.json(vehiculo);
    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        res.status(500).send('Error al actualizar el vehículo');
    }
};

exports.deleteVehiculo = async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findByPk(req.params.id);
        if (!vehiculo) {
            return res.status(404).send('Vehículo no encontrado');
        }
        await vehiculo.destroy();
        res.send('Vehículo eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el vehículo');
    }
};

exports.mostrarFormulario = (req, res) => {
    res.render('publicar', { title: 'Publicar Vehículo' });
};

exports.procesarFormulario = async (req, res) => {
    const { Marca, Modelo, Combustible, Año, Precio, TipoVehiculo } = req.body;
    const imagen1 = req.files.imagen1 ? req.files.imagen1[0].filename : null;
    const imagen2 = req.files.imagen2 ? req.files.imagen2[0].filename : null;
    if (!req.session || !req.session.user || !req.session.user.user_id) {
        return res.status(401).send('Debes iniciar sesión para publicar un vehículo.');
    }
    const usuario_id = req.session.user.user_id;

    try {
        await Vehiculo.create({
            Marca,
            Modelo,
            Combustible,
            Año,
            Precio,
            Imagen1: imagen1,
            Imagen2: imagen2,
            TipoVehiculo: TipoVehiculo,
            usuario_id  
        });
        res.redirect('/vehiculos');
    } catch (error) {
        console.log("error al crear el vehículo:", error);
        res.status(500).send('Error al publicar el vehículo.');
    }
};
