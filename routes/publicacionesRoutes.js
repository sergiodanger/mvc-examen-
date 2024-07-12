const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicacionesController');
const isAuthenticated = require('../middleware/auth');
const isAdmin = require('../middleware/authAdmin');

router.get('/', isAuthenticated, isAdmin, publicacionesController.listarPublicaciones);
router.delete('/:id', isAuthenticated, isAdmin, publicacionesController.eliminarPublicacion);

module.exports = router;
