/**
 * Adjunta un archivo a una colección y recupera los archivos adjuntados
 */
/*jshint esversion: 6 */
const path = require('path');
const fs = require('fs');
const { response, request } = require('express');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-Imagen');

 putAdjuntarArchivo = (req, res = response) => {

    const coleccion = req.params.coleccion;
    const uid = req.params.uid;

    // verificamos que el nombre de la colección sea valido
    const coleccionesValidas = ['usuarios', 'productos'];
    if (!coleccionesValidas.includes(coleccion)) {

        return res.status(400).json({
            ok: false,
            msg: 'No existe la coleccion de documentos'
        })
    }

    // verificamos que se haya seleccionado un archivo.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se adjunto ningun archivo'
        });
    }

    // Verificamos que el documento exista en la colección, 

    // Verificamos que solo se permita adjuntar imagenes.
    const extensionPermitidas = ['jpg', 'jpeg', 'png', 'gif'];
    const archivoAdjunto = req.files.adjunto;
    const nombreSeparado = archivoAdjunto.name.split('.');
    const extension = nombreSeparado[nombreSeparado.length - 1];

    if (!extensionPermitidas.includes(extension)) {
        return res.json({
            ok: false,
            msg: 'El tipo de archivo no es permitido. Debe de ser una imagen'
        });
    }
    
    // Si existe el documento en la colección entonces tenemos que renombrar el archivo y mover a la carpeta apropiada
    const nombre = `${uuidv4()}.${extension}`;
    const uploadPath =  `${__dirname}/../uploads/${coleccion}/${nombre}`;

    // Use the mv() method to place the file somewhere on your server
    archivoAdjunto.mv(uploadPath, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error no se pudo adjuntar el archivo. Hable con el administrador'
            });
        }

        // actaulizamos la base de datos y si estaba antes lo borramos
        actualizarImagen();
        
        res.json({
            ok: true,
            msg: 'Archivo ' + archivoAdjunto.name + ' agregado',
            nombre
        });
    });
 };

 getObtenerAdjuntos = (req, res = response) => {

    const coleccion = req.params.coleccion;
    const uid = req.params.uid;

    const pathFile = path.join( __dirname, `../uploads/${ coleccion }/${uid}`);
    const pathNotFoundImage = path.join(__dirname, `../uploads/no-image.png`);

    if (fs.existsSync(pathFile)) {
        res.sendFile(pathFile);
    } else {
        res.sendFile(pathNotFoundImage);
    }
 };

 module.exports = {
    putAdjuntarArchivo,
    getObtenerAdjuntos
 };