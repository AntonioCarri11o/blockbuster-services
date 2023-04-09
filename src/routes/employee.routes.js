//RUTAS PARA GESTIÓN DE EMPLEADOS
const express=require("express");
const { getEmployees, createEmployee, getById, update, changePassword, deleteEmployee, getSorter, getByTags } = require('../controllers/employee.controller');
const {verifyToken}=require('../middlewares');
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas


//Listar sin filtro ni ordenamiento
router.get("/employee/",getEmployees);

//Listar con ordenamiento por campo
/*
'field': Campo de ordenamiento,
'order': Valor entero de ordenamiento (1/-1)
*/
router.get('/employee/:field/:order/',getSorter);

//Listar con filtrado y ordenamiento por campo
/*
'field':Campo filtro,
'value':Valor a comparar,
'orderField': Campo de ordenamiento,
'order': Valor entero de ordenamiento (1/-1)
*/
router.get('/employee/:field/:value/:orderField/:order/',getByTags);

//Consultar por id
router.get("/employee/:id/",getById);

//Crear nuevo
router.post("/employee/",createEmployee);

//Actualizar
router.put("/employee/",update);

//Actualizar contraseña
router.put("/employee/password/",changePassword);

//Eliminar
router.delete("/employee/:id/",deleteEmployee);

//Se exporta router, router contiene todas las rutas de employee
module.exports=router;