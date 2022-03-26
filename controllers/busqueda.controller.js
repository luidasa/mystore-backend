const { response, request } = require('express');

const Producto = require("../models/producto");
const Usuario = require('../models/usuario');

const getBuscarTermino = async (req = request, res = response) =>{

    const pagina = Number(req.query.page) || 0;
    const renglones = Number(req.query.size) || 10;
    const termino = req.params.termino;
    const regex = new RegExp(termino, 'i')

    const [usuarios, totalUsuarios, productos, totalProductos] = await Promise.all([
        Usuario.find({nombre: regex})
            .skip(pagina * renglones)
            .limit(renglones),
        Usuario.find({nombre: regex}).count(),
        Producto.find({titulo: regex})
            .skip(pagina * renglones)
            .limit(renglones),
        Producto.find({titulo: regex}).count()        
    ])
    return res.json({
        ok: true,
        usuarios: {usuarios, paginacion: {total: totalUsuarios, pagina, renglones}},
        productos: {productos, paginacion: {total: totalProductos, pagina, renglones}}
    })
 }

 getBuscarColeccionTermino = async (req, res = response) => {

    const pagina = Number(req.query.page) || 0;
    const renglones = Number(req.query.size) || 10;
    const termino = req.params.termino;
    const coleccion = req.params.coleccion;
    const regex = new RegExp(termino, 'i')
    var datos = [];
    var total = 0;

    switch (coleccion) {
        case 'productos':
            [datos, total] = await Promise.all([
                Producto.find({titulo: regex})
                    .skip(pagina * renglones)
                    .limit(renglones),
                Producto.find({titulo: regex}).count()        
            ])
                    
            break;
        case 'usuarios':
            [datos, total] = await Promise.all([
                Usuario.find({nombre: regex})
                    .skip(pagina * renglones)
                    .limit(renglones),
                Usuario.find({nombre: regex}).count(),
            ])
        
            break;
        
        default:
            return res.json({
                ok: false,
                msg: 'Solo puede buscar en las colecciones de usuarios y productos'
            })
            break;
    }
    const paginacion= {pagina, renglones, total} 
    return res.json({
        ok: true,
        datos,
        paginacion
    })

 }
module.exports = { getBuscarTermino, getBuscarColeccionTermino }


