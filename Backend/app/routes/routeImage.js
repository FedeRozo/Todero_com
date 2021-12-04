const express = require ('express');
const Image = require ('../models/images');
const storage = require('../config/multer');
const multer = require('multer');
const RouterImg = express.Router();
const ImageCtrl = require ('../controllers/ImageController');

const uploader = multer({
    storage
}).single('file')

RouterImg.post('/', uploader, async(req,res) => {
    const {body, file} = req;
    if (file && body){
        const newImage = new Image ({
            fileName: body.name,
            fileUrl: `http://localhost:4000/${file.filename}`
            
        })
        await newImage.salve();
        res.json({
            newImage: newImage
        })
    }
})


RouterImg.get('/', ImageCtrl.listarImage)
         .get('/:key/:value',ImageCtrl.showImage )

module.exports = RouterImg;