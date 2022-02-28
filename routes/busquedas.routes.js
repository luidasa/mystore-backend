/* 
    Define la url para search.
*/

const { Router } = require('express');

const { getBuscarTermino, getBuscarColeccionTermino } = require('./../controllers/busqueda.controller')

const { validarJwt } = require('../middlewares/validar-jwt.middleware');

const router = Router();

router.get('/:termino',
    [validarJwt],
    getBuscarTermino);

    router.get('/coleccion/:coleccion/:termino',
    [validarJwt],
    getBuscarColeccionTermino);

module.exports = router;