const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    precio: {
        type: Number,
        required: true,
    },
    creadoPor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creadoEl: {
        type: Date
    },
    comentarios: [
        { author: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        }, 
        comentario: String, 
        creadoEl: Date }
    ],
    estaOculto: Boolean,
    meta: {
      votos: Number,
      favoritos:  Number
    }
}, {collection: 'Productos'})


ProductoSchema.method('toJSON', function()  {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Producto', ProductoSchema)