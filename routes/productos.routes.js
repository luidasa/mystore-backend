const { Router } = require('express');

const { check } = require('express-validator')

const { validarCampos } = require('../middlewares/validarcampos.middleware')

const { getProductos, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { validarJwt } = require('../middlewares/validar-jwt.middleware');

const router = Router();

router.get('/',
    [validarJwt],
    getProductos);

router.post('/', 
    [
        validarJwt,
        check('titulo', 'El titulo es obligatorio').notEmpty(),
        check('descripcion', 'La descripción es obligatorio').notEmpty(),
        check('precio', 'El precio es obligatorio').isNumeric(),
        validarCampos
    ],
    crearProducto);

router.put('/:id', 
    [
        validarJwt,
        check('titulo', 'El titulo es obligatorio').notEmpty(),
        check('descripcion', 'La descripción es obligatorio').isEmail(),
        check('precio', 'El precio es obligatorio').notEmpty(),
        validarCampos
    ],
    actualizarProducto);

router.delete('/:id', [validarJwt], borrarProducto);

// Exportamos todo las rutas que se han definido en el router, para este modulo
module.exports = router;