// controllers/venderController.js
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

exports.mostrarFormulario = (req, res) => {
    res.render('vender', { title: 'Crear una cuenta para vender un vehículo', errors: null });
};

exports.procesarFormulario = async (req, res) => {
    const { nombre, apellido, email, username, password } = req.body;
    const errors = [];
    
    try {
        
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            errors.push('El email ya está registrado.');
        }
        const usernameExistente = await Usuario.findOne({ where: { username } });
        if (usernameExistente) {
            errors.push('El nombre de usuario ya está en uso.');
        }

        if (errors.length > 0) {
            return res.render('vender', { title: 'Crear una cuenta para vender un vehículo', errors });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            username,
            password: hashedPassword,
            tipo_perfil_id: 2 // Asumiendo que el perfil 2 es el de vendedor
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        errors.push('Algo salió mal. Por favor, inténtalo de nuevo.');
        res.render('vender', { title: 'Crear una cuenta para vender un vehículo', errors });
    }
};
