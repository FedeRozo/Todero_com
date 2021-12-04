const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    clave:{ 
        type: String,
        required: true
    },
    email: 
    {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Cliente', 'Tecnico']
    },
    imagen: String,
    fecha:{
        type: Date,
        default: Date.now()
    },
    ubicacion: {
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
    }
});
const User = mongoose.model('Users', UserSchema);
module.exports = User;
