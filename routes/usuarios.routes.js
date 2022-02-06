/*

    Ruta: /api/usuarios

*/

//Se obtiene el router de express para crear las
const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);


// Exportamos todo las rutas que se han definido en el router, para este modulo
module.exports = router;