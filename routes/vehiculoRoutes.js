const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/', vehiculoController.listarVehiculos);
router.get('/publicar', vehiculoController.mostrarFormulario);
router.post('/publicar', upload.fields([{ name: 'imagen1', maxCount: 1 }, { name: 'imagen2', maxCount: 1 }]), vehiculoController.procesarFormulario);
router.get('/search', vehiculoController.searchVehiculos);  // Ruta de búsqueda abierta
router.get('/:id', vehiculoController.getVehiculoById);
router.get('/getUpdate/:id', vehiculoController.getVehiculoByIdUpdate);     // Ruta para detalles del vehículo
router.put('/:id', vehiculoController.updateVehiculo);
router.delete('/:id', vehiculoController.deleteVehiculo);

module.exports = router;
