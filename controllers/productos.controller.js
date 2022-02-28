
const { response } = require('express');
const { contextsKey } = require('express-validator/src/base');

const req = require("express/lib/request");
const res = require("express/lib/response");
const Producto = require("../models/producto");

const getProductos = async (req, res) =>{ 

    const pagina = Number(req.query.page) || 0;
    const tamano = Number(req.query.size) || 10;

    const [productos, total] = await Promise.all([
        Producto.find()
            .skip(pagina * tamano)
            .limit(tamano)
            .populate('creadoPor', 'nombre'), 
        Producto.count()]) ;
    
    res.json({
        ok: true,
        productos,
        total,
        pagina,
        tamano
    });
}

const crearProducto = async (req, res = response) => {
    
    try {
        const { titulo } = req.body;
        const uid = req.uid;
        const existeProducto = await Producto.findOne({titulo});
        if (existeProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'El producto ya esta registrado'
            })
        }
        const producto = new Producto({creadoPor: uid, creadoEl: Date.now(), ...req.body});
        await producto.save();

        res.json({
            ok: true,
            producto
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

const actualizarProducto = async( req, res = response) => {

    const uid = req.params.id;

    try {

        const productoBd = await Producto.findById(uid);

        if ( !productoBd ) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe'
            })
        }

        productoActualizado = await Producto.findByIdAndUpdate(uid, req.body, {new: true});

        res.json({
            ok: true,
            producto: productoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarProducto = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const productoBd = await Producto.findById(uid);

        if ( !productoBd ) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no existe'
            })
        }

        await Producto.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            uid: uid,
            msg: 'Producto borrado'
        })
            
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Error inesperado'
        })
            
    }
}


module.exports = {
    getProductos, 
    crearProducto, 
    actualizarProducto, 
    borrarProducto
};