//RUTAS PARA GESTIÓN DE CLIENTES
const express=require("express");
const {getCustomers,getById,createCustomer,updateCustomer, getSorter, getByTags}=require('../controllers/customer.controller.js');
const { verifyToken } = require("../middlewares/authJwt.js");
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas


//Crear nuevo
router.post('/customer/',createCustomer);

//Listar sin filtro ni ordenamiento
router.get("/customer/",getCustomers);

//Listar con ordenamiento por campo
/*
'field': Campo de ordenamiento,
'order': Valor entero de ordenamiento (1/-1)
*/
router.get("/customer/:field/:order/",getSorter);

//Listar con filtrado y ordenamiento por campo
/*
'field':Campo filtro,
'value':Valor a comparar,
'orderField': Campo de ordenamiento,
'order': Valor entero de ordenamiento (1/-1)
*/
router.get('/customer/:field/:value/:orderField/:order/',getByTags)

//Consultar cliente por id (no se usa)
router.get("/customer/:id",getById);

//Actualizar
router.put("/customer/",updateCustomer);

//Se exporta router, router contiene todas las rutas de customers
module.exports=router;