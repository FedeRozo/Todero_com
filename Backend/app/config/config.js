// va a tener variable de configuracion.
// PORT => en produccion el puerto tomara variables de entorno en local solo lo harra en el puerto 4000
module.exports = {
    PORT: process.env.PORT || 4000,
    DB: process.env.DB || 'mongodb://localhost:27017/ToderoDB'
}