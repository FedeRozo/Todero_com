const express = require ('express');
const ToderoCtrl = require ('../controllers/ToderoController');

const RouterTodero = express.Router();
RouterTodero.get('/', ToderoCtrl.index) //api.com/Tder
     .post('/', ToderoCtrl.create)
     .get('/:key/:value', ToderoCtrl.buscar, ToderoCtrl.show)
     .put('/:key/:value', ToderoCtrl.buscar, ToderoCtrl.update)
     .delete('/:key/:value', ToderoCtrl.buscar, ToderoCtrl.remove);
     
module.exports = RouterTodero;