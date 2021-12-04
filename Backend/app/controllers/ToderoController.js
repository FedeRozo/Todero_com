const ToderoCtrl = require ('../models/Todero');

function index (req, res){
    ToderoCtrl.find({})
    .then(Toderos => {
        if(Toderos.length) return res.status(200).send({Toderos});
        return res.status(204).send({menssage: 'No hay contenido'});
    }).catch(error => res.status(500).send({error}));
}

function show (req, res){
    if (req.body.error) return res.status(500).send({error});
    // se niega para que cuando no encuentra un usuario presente un error 404
    if (!req.body.toderos) return res.status(404).send({message: 'NOT FOUND'}); 
    let todero2 = req.body.toderos;
    return res.status(200).send({todero2});
}

function create (req,res){
    new ToderoCtrl (req.body).save().then(todero => res.status(201).send({todero})).catch(error => res.status(500).send({error}));
}

function update (){
    if (req.body.error) return res.status(500).send({error});
    if (!req.body.toderos) return res.status(404).send({message: 'NOT FOUND'});   
    let todero1 = req.body.toderos[0];
    // se asigna el valor cero [0] que esta en el cuerpo de la peticion como un objeto a la variable user
    todero1 = Object.assign(todero1,req.body);
    //guarda el usuario efectuando los cambios.
    todero1.save().then(todero => res.status(201).send({menssage: "UPDATE", todero})).catch(error => res.status(500).send({error}));
}

function remove (){
    if (req.body.error) return res.status(500).send({error});
    // se niega para que cuando no encuentra un producto presente un error 404
    if (!req.body.toderos) return res.status(404).send({message: 'NOT FOUND'});
    req.body.toderos[0].remove().then(todero => res.status(200).send({menssage: "REMOVED", todero})).catch(error => res.status(500).send({error}));
}

function buscar (req, res, next){
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query [req.params.key] = req.params.value;
    ToderoCtrl.find (query).then (Todero1 => {
        if (!Todero1.length) return next();
        //se guarda en body para tenerlo listo para la siguiente funcion
        req.body.toderos = Todero1;
        return next();
        }).catch(error => {
            req.body.error = error;
            next();
        })
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    buscar
}