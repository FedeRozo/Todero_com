const mongoose = require('mongoose');

const ClienteSchemas = new mongoose.Schema ({
    idUser: {
        type: ObjectId(),
        required: true,
        unique: true
    },
    publicaciones: {
        type: Number,
        default: 0
    }
});

