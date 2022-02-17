const jwt = require('jsonwebtoken')

const validarJwt = (req, res, next) => {

    // leer el token de los headers 
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene token de acceso'
        })
    }

    try {

        const {uid } = jwt.verify(token, process.env.JWT_SECRET )
        req.uid = uid;
        
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token de acceso invalido'
        })
        
    }
}


module.exports = {validarJwt }