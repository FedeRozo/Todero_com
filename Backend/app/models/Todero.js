const mongoose = require('mongoose');

const ubicacionSchemas = mongoose.Schema({
    pais: {
        type: String,
        default: 'Colombia'
    },
    departamento: {
        type: String,
        enum: ['Cundinamarca','Santander','Norte de Santander', 'Boyaca','Antioquia']
    },
    ciudad: String,
    direccion: String, 
    latitud: {
        type: Number,
        required: true
    },
    longitud:{
        type: Number,
        required: true
    }
});
const ubicacion = mongoose.model('ubicacion', ubicacionSchemas);
module.exports = ubicacion;