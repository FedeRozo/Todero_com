const { Mongoose } = require('mongoose');
const UserMd = require('../models/Users');
const mongoose = require('mongoose');

//se crea la funcion que responde a cada una de las diferentes peticiones o rutas
function index(req,res){
    UserMd.find({},{"ubicacion": false})
        .then(Users =>{
            if (Users.length) return res.status(200).send({Users});
            return res.status(204).send({message: 'No Contiene'});
        }).catch(error => res.status(500).send({error}));
}

function show(req,res){
    if (req.body.error) return res.status(500).send({error});
    // se niega para que cuando no encuentra un usuario presente un error 404
    if (!req.body.users) return res.status(404).send({message: 'NOT FOUND'}); 
    let user2 = req.body.users[0];
    return res.status(200).send(user2);
}

function create(req,res){
    new UserMd(req.body).save().then(user => {res.status(201).send({user})
    }).catch(error => {res.status(500).send({error})
});
}

function update(req,res){
    if (req.body.error) return res.status(500).send({error});
    if (!req.body.users) return res.status(404).send({message: 'NOT FOUND'});   
    let user1 = req.body.users[0];
    // se asigna el valor cero [0] que esta en el cuerpo de la peticion como un objeto a la variable user
    user1 = Object.assign(user1,req.body);
    //guarda el usuario efectuando los cambios.
    user1.save()
    .then(user => res.status(201).send({menssage: "UPDATE", user}),
        addUbicacion ()
    )
    .catch(error => res.status(500).send({error}));
}

function remove(req,res){
    if (req.body.error) return res.status(500).send({error});
    // se niega para que cuando no encuentra un producto presente un error 404
    if (!req.body.users) return res.status(404).send({message: 'NOT FOUND'});
    req.body.users[0].remove().then(user => res.status(200).send({menssage: "REMOVED", user})).catch(error => res.status(500).send({error}));
}

function buscarUbicacion (req,res){
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query ["ubicacion."+`${req.params.key}`] = req.params.value;
    UserMd.find(query, {"ubicacion":true})
        .then(Users =>{
            if (Users.length) 
            return res.status(200).send({Users});
            return res.status(204).send({message: 'No Contiene'});
        }).catch(error => res.status(500).send({error}));
}
function buscarUserUbicacion (req,res){
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query [req.params.key] = req.params.value;
    UserMd.find (query,{"ubicacion":true}).then(Users =>{
        user1 = Users[0].ubicacion;
        if (Users.length) return res.status(200).send(user1);
        return res.status(204).send({message: 'No Contiene'});
    }).catch(error => res.status(500).send({error}));
}
function addUbicacion (req,res){
    let error;
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query ["ubicacion."+`${req.params.key}`] = req.body.ubicacion;
    UserMd.updateOne ({_id: 'req.body.user._id'}, {
        $set: {query}
        }
    (error)={
        if (error){
            error = error
        }
    })
    .then(user => res.status(201).send({menssage: "UPDATE", user}))
    .catch(error => res.status(500).send({error}));

}
function LoginUser (req,res){
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query ["email"] = req.params.email;
    UserMd.find (query,{"_id":true, "clave":true}).then (Users1 => {
        if (!Users1.length) return res.status(404).send({status: 'notReg'});
            Clave = Users1[0].clave
            user = Users1[0]._id
            if (Clave == req.params.clave) return res.status(201).send({status: 'OkIn',user});
            return res.status(404).send({status: "notIn", user});
        }).catch(error => res.status(500).send({error}));
}

// este es un middleware que es un controlador que se ejecuta en medio de otros.
//primero debe de buscar y luego si realiza cualquiers de las 3 operaciones como son "Show, Update y remove"
// para ello se coloca el next que cuando se ejecuta permirte la otra operacion
// para que este metodo sea dinamico en routeUser.js se coloco los parametros "/:key/:value"
function buscar(req, res, next){
    let query = {};
    //estos representan los parametros enviados a la variable "/:key/:value"
    query [req.params.key] = req.params.value;
    UserMd.find (query,{"ubicacion":false}).then (Users1 => {
        if (!Users1.length) return next();
        //se guarda en body para tenerlo listo para la siguiente funcion
        req.body.users = Users1;
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
    buscarUbicacion,
    addUbicacion,
    buscarUserUbicacion,
    LoginUser,
    buscar
}