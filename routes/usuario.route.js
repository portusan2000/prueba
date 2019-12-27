const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const mdAutenticacion = require('../middlewares/autenticacion');

// Rutas con verificacion de Token
// router.get('/', mdAutenticacion.verificaToken, usuarioCtrl.getAllUsers);
// router.post('/', mdAutenticacion.verificaToken, usuarioCtrl.addNewUser);
// router.delete('/:id', mdAutenticacion.verificaToken, usuarioCtrl.deleteUser);
// router.put('/:id', mdAutenticacion.verificaToken, usuarioCtrl.updateUser);

// Rutas sin verificación de Token
router.get('/', usuarioCtrl.getAllUsers);
router.post('/', usuarioCtrl.addNewUser);
router.delete('/:id', usuarioCtrl.deleteUser);
router.put('/:id', usuarioCtrl.updateUser);

module.exports = router;