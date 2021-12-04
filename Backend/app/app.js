//inicializar variables 
var express = require('express');
var bodyParser = require('body-parser');


const app = express();

const User = require('./routes/routeUser');
const Tdero = require('./routes/routeTodero');
const Image = require ('./routes/routeImage') ;
app.use (express.static(__dirname + '/views'));
app.use (express.static(__dirname + '/upload'));
app.use(bodyParser.json());
// se usa en false para solo recibir peticiones en Json
app.use(bodyParser.urlencoded({extended: false}));
app.use('/User', User);
app.use('/Tder', Tdero);
app.use('/Loader', Image);

module.exports = app;