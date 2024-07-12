const Publicacion = require('../models/Publicacion');

exports.listarPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll();
        res.render('publicaciones', { title: 'Administrar Publicaciones', publicaciones });
    } catch (error) {
        res.status(500).send('Error al listar las publicaciones.');
    }
};

exports.eliminarPublicacion = async (req, res) => {
    const { id } = req.params;
    try {
        await Publicacion.destroy({ where: { id } });
        res.redirect('/publicaciones');
    } catch (error) {
        res.status(500).send('Error al eliminar la publicación.');
    }
};
