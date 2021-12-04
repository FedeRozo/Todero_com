const mongoose = require ('mongoose');
const imagenSchema =  new mongoose.Schema({
    fileName: {type: String},
    fileUrl: {type: String},
    uploadDate:{type: Date, default: Date.now()} 
})
const Image = mongoose.model('Image', imagenSchema);
module.exports = Image;