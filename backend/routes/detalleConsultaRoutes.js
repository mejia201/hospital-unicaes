const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const detalleConsultaController = require('../controllers/detalleConsultaController');
const router = express.Router();


router.post('/registrar', authMiddleware, detalleConsultaController.insertarDetalleConsulta);
router.get('/listar', authMiddleware, detalleConsultaController.listarDetallesConsultasActivas);
router.get('/listar/:id', authMiddleware, detalleConsultaController.listarDetalleConsultasById);
router.get('/listar-detalles/:id', authMiddleware, detalleConsultaController.listarDetalleConsultasByIdUsuario);

router.patch('/cambiar-estado', detalleConsultaController.cambiarEstadoDetalleConsulta); 
router.put('/actualizar/:id', authMiddleware, detalleConsultaController.actualizarDetalleConsulta);



module.exports = router;