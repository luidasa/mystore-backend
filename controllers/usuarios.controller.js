const Usuario = require("../models/usuario");

const { response } = require('express');

const bcrypt = require('bcryptjs');
const req = require("express/lib/request");
const res = require("express/lib/response");
const { generarToken } = require("../helpers/jwt");

const getUsuarios = async (req, res) =>{ 

    const usuarios = await Usuario.find();
    res.json({
        ok: true,
        data: usuarios,
        uid: req.uid
    });
}

const crearUsuario = async (req, res = response) => {

    const {email, nombre, password } = req.body;

    try {
        const usuario = new Usuario(req.body);
        const existeUsuario = await Usuario.findOne({email});
        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            })
        }

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarToken(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
       })
    } catch (error) {
        res.status(500).json({
            ok: false,
            data: req.body,
            error,
            msg: error.toString()
       })
        
    }
}

const actualizarUsuario = async( req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioBd = await Usuario.findById(uid);

        if ( !usuarioBd ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        /// TODO. Validar token de usuario y verificar la autorización
        const {google, password, email, ...campos} = req.body;

        // Verificamos si el correo electronico del request es igual al usuario actualizado.
        if (email !== usuarioBd.email) {
            const emailExiste = await Usuario.findOne({email});
            if (emailExiste) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya esta registrado'
                })
            }
        }
        campos.email = email;
        usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioBd = await Usuario.findById(uid);

        if ( !usuarioBd ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            uid: uid,
            msg: 'Usuario borrado'
        })
            
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error inesperado'
        })
            
    }
}


module.exports = {
    getUsuarios, 
    crearUsuario, 
    actualizarUsuario, 
    borrarUsuario
};