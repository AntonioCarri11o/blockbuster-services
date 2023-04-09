//RUTAS PARA GESTIÓN DE PELÍCULAS
const express= require("express");
const {getMovies, createMovie,getById,getByName,update, getSorter, getBytags} =require('../controllers/movie.controller');
const {verifyToken}= require('../middlewares/authJwt.js');
const { upload } = require("../middlewares/fileUpload");
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas

//Crear Nuevo
router.post('/movie/',createMovie);

//Lista sin filtro ni ordenamiento
router.get('/movie/',getMovies);

//Lista con ordenamiento por campo
router.get('/movie/sorter/:field/:order',getSorter);

//Lista con filtrado y ordenamiento por campo
router.get('/movie/getBytags/:field/:name/:orderField/:order',getBytags);

//Obrener por id (no se usa)
router.get('/movie/:id',getById);

//Obrener por nombre (no se usa)
router.post('/movie/getbyname/',getByName);

//Actualizar
router.put('/movie/',update);

//Se exporta router, router contiene todas las rutas de movie
module.exports=router;