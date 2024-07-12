// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const isAuthenticated = require('../middleware/auth');
const isAdmin = require('../middleware/authAdmin');

router.get('/', isAuthenticated, isAdmin, usuarioController.getAllUsuarios);
router.post('/', isAuthenticated, isAdmin, usuarioController.createUsuario);
router.get('/:id', isAuthenticated, isAdmin, usuarioController.getUsuarioById);
router.put('/:id', isAuthenticated, isAdmin, usuarioController.updateUsuario);
router.delete('/:id', isAuthenticated, isAdmin, usuarioController.deleteUsuario);

module.exports = router;
