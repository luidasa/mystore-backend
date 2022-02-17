const { response } = require('express');

const Usuario = require("../models/usuario");

const bcrypt = require('bcryptjs');

const {generarToken} = require('../helpers/jwt')

const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {
        const usuario = await Usuario.findOne({email});

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        // Ahora validamos la contraseña
        const isValid = bcrypt.compareSync(password, usuario.password);

        if (!isValid) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Aqui se va a generar el token.
        const token = await generarToken(usuario.id);

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error );
        return res.status(500).json({
            ok:false,
            msg: 'Error inesperado.'
        });
    }
}

module.exports = {
    login
}