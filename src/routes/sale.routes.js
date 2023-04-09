//RUTAS PARA GESTIÓN DE VENTAS
const express= require("express");
const {newSale,getSales,getById,getByCustomer,update}= require('../controllers/sale.controller.js')
const {verifyToken}= require('../middlewares/authJwt.js')
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas

//Crear nueva
router.post('/sale/',newSale);

//Listar sin filtro ni ordenamiento
router.get('/sale/',getSales);

//Consultar por id
router.get('/sale/:id/',getById);

//Consultar por cliente
router.post('/sale/bycustomer/',getByCustomer);

//Actualizar
router.put('/sale/',update);

//Se exporta router, router contiene todas las rutas de employee
module.exports=router;