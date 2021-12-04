//se genera la conexion a la base de datos
const mongoose = require('mongoose');
const CONFIG = require('./config');
// se exporta la conexion a la base de datos
module.exports = {
    connection: null,
    // funcion revisa si ya se realizo la conexion y si no la realiza 
    connect: function(){
        if (this.connection) return this.connection;
        return mongoose.connect(CONFIG.DB).then(connection =>{
            this.connection = connection;
            console.log('Conexion a Base de datos Exitosa');
            // si se produce un error en la conexion lo imprime
        }).catch(error => console.log(error));
    }
}