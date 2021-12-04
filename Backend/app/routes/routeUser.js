const express = require('express');
const userCrtl = require('../controllers/userController');

const Router = express.Router();
Router.get('/', userCrtl.index)// api.com/User/  index: lista todos los usuarios
      .post('/',userCrtl.create) // api.com/User/  greate: crea un nuevo usuario
      .get('/:key/:value', userCrtl.buscar, userCrtl.show) // api.com/User/role/cliente    Show: muestra un usuario que pido con unos parametros especificos
      .get ('/login/:email/:clave',userCrtl.LoginUser)// es el login de usuario
      .get ('/Ubicar/:key/:value', userCrtl.buscarUserUbicacion )
      .put('/:key/:value',userCrtl.buscar, userCrtl.update) // api.com/User/email/     update: actualiza un usuario en especifico
      .delete('/:key/:value', userCrtl.buscar, userCrtl.remove)// api.com/User/email/
      .get('/Ubicacion/:key/:value',userCrtl.buscarUbicacion) // consulta sobre ubicacion

module.exports = Router;