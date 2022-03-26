/* 
    Define la url para mostrar y adjuntar los archivos

    /api/upload/
*/

const { Router } = require('express');

const fileUpload = require('express-fileupload');

const { getObtenerAdjuntos, putAdjuntarArchivo } = require('../controllers/upload.controller');

const { validarJwt } = require('../middlewares/validar-jwt.middleware');

const router = Router();

// configuramos el filtro fileUpload con las configuraciones basicas.
router.use( fileUpload() );

router.put('/:coleccion/:uid',
    [validarJwt],
    putAdjuntarArchivo);

router.get('/:coleccion/:uid',
    [validarJwt],
    getObtenerAdjuntos);

module.exports = router;