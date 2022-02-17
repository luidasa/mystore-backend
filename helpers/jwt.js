var jwt = require('jsonwebtoken');

const generarToken = (uid) => {

    return new Promise ((resolve, reject) => {
        const payload = {
            uid
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if  (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token)
            }
        });
    });

}

const esTokenValido = (token) => {

    return new Promise((resolve, reject ) => {

        if (token) {
            reject('No existe el token')
        }

        const {uid} = jwt.verify(token,  process.env.JWT_SECRET);
        resolve (uid)
    })
}

module.exports = {
    generarToken, esTokenValido
}