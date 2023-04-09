//RUTAS PARA GESTIÓN DE JUEGOS
const express= require('express');
const {createGame, getGames, deleteGame, update, getSorter, getByTags}= require('../controllers/game.controller');
const {verifyToken}= require('../middlewares/authJwt.js');
const {upload}= require('../middlewares/fileUpload');
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas

//Crear nuevo
router.post('/game/',createGame);

//Listar sin filtro ni ordenamiento
router.get('/game/',getGames);


//Listar con ordenamiento por campo
/*
'field': Campo de ordenamiento,
'order': Valor entero de ordenamiento (1/-1)
*/
router.get('/game/:field/:order/',getSorter);

//Listar con filtrado y ordenamiento por campo
/*
'field':Campo filtro,
'value':Valor a comparar,
'orderField': Campo de ordenamiento,
'order': Valor entero de ordenamiento (1/-1)
*/
router.get('/game/:field/:value/:orderField/:order',getByTags);

//Actualizar
router.put('/game/',update)
//Eliminar
router.delete('/game/:id',deleteGame);

//Se exporta router, router contiene todas las rutas de employee
module.exports=router;