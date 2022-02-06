const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) =>{ 

    const usuarios = Usuario.find();

    res.json({
            ok: true,
            usuarios: usuarios
    });
}

const crearUsuario = async (req, res) => {

    const usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.json({
            ok: true,
            usuario
       })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            data: req.body,
            error,
            msg: error.toString()
       })
        
    }
}

module.exports = {getUsuarios, crearUsuario};