/*

    Ruta: /api/usuarios

*/

//Se obtiene el router de express para crear las
const { Router } = require('express');

const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validarcampos.middleware')

const { validarJwt } = require('../middlewares/validar-jwt.middleware');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/',
    [validarJwt],
    getUsuarios);

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        validarCampos
    ],
    crearUsuario);

router.put('/:id', 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').notEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.delete('/:id', borrarUsuario);

// Exportamos todo las rutas que se han definido en el router, para este modulo
module.exports = router;