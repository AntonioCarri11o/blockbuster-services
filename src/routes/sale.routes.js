//RUTAS PARA GESTIÓN DE VENTAS
const express= require("express");
const {newSale,getSales,getById,getByCustomer,update, getByProduct, getGain, getByPriceR}= require('../controllers/sale.controller.js')
const {verifyToken}= require('../middlewares/authJwt.js')
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas

//Crear nueva
router.post('/sale/',newSale);

//Listar sin filtro ni ordenamiento
router.get('/sale/',getSales);

//Consultar por id
router.get('/sale/:id/',getById);

//Consultar por cliente
router.get('/sale/customer/:field/:value/',getByCustomer);

//Consultar por producto
router.get('/sale/product/:field/:value/',getByProduct);

//Consultar ganancias totales
router.get('/sale/sale/gain/',getGain);

//Consultar por rango de precio de producto
router.get('/sale/range/:gte/:lte/',getByPriceR);

//Actualizar
router.put('/sale/',update);

//Se exporta router, router contiene todas las rutas de employee
module.exports=router;