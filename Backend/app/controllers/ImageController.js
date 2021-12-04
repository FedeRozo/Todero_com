const Image = require ('../models/images');

function listarImage (req,res){
    Image.find({})
    .then(Images =>{
        if (Images.length) return res.status(200).send({Images});
        return res.status(204).send({message: 'No Contiene'});
    }).catch(error => res.status(500).send({error}));

}

function showImage(req,res){
    if (req.body.error) return res.status(500).send({error});
    // se niega para que cuando no encuentra un usuario presente un error 404
    if (!req.body.images) return res.status(404).send({message: 'NOT FOUND'}); 
    let image2 = req.body.images[0];
    return res.status(200).send({image2});
}

function buscar(req, res, next){
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query [req.params.key] = req.params.value;
    Image.find (query).then (Image1 => {
        if (!Image1.length) return next();
        //se guarda en body para tenerlo listo para la siguiente funcion
        req.body.images = Image1;
        return next();
        }).catch(error => {
            req.body.error = error;
            next();
        })
}
module.exports = {
    listarImage,
    showImage,
    buscar
}