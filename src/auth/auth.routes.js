//RUTAS SESIÓN
const express=require('express');
const {signIn,signUp} =require("./auth.controller");
const router=express.Router();//La librería express con el método Router() pemrite la creación de rutas

//Registrarse
router.post('/signUp/',signUp);

//Iniciar sesión
router.post('/signIn/',signIn);

//Se exporta router, router contiene todas las rutas de auth
module.exports=router;