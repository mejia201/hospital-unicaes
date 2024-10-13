const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); 
const consultaController = require('../controllers/consultaController');
const router = express.Router();


router.post('/registrar', authMiddleware, consultaController.insertarConsulta);
router.get('/listar', authMiddleware, consultaController.listarConsultasActivos);
router.patch('/cambiar-estado', consultaController.cambiarEstadoConsulta); 
router.put('/actualizar/:id', authMiddleware, consultaController.actualizarConsulta);
router.put('/tomar-consulta/:id', authMiddleware, consultaController.tomarConsulta);


module.exports = router;