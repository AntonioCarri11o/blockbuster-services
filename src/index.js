//PRINCIPAL DEL SERVIDOR

//Importaciones
const express = require('express');
const employees=require('./routes/employee.routes.js');
const customers=require('./routes/customers.routes.js');
const movies=require('./routes/movie.routes.js')
const games=require('./routes/game.routes.js');
const sales=require('./routes/sale.routes.js')
const auth=require('./auth/auth.routes');
const pkg=require('../package.json');
const morgan=require('morgan');
const mongoose=require("mongoose");
const {createRoles} =require("./libs/initialSetup");
const cors= require ('cors');
const path=require('path');

require ("dotenv").config();

const app = express(); //La librería express permite crear un servidor de nodeJs
app.use(cors());//Permite la realización de solicitudes de origen cruzado

//Arranque de nuestro Server
//Settings
app.set('port',process.env.PORT || 3000); //El puerto que estaremos usando en todo momento 
app.set('json spaces',2) //Espacios para nuestro json *Es irrelente pero lo hace estetico*
app.set('pkg',pkg)
//Middlewares
app.use(express.json());
app.use('/api',customers);
app.use('/api',employees);
app.use('/api',movies);
app.use('/api',games);
app.use('/api',sales);
app.use('/api',auth);
//Arrancar el server
app.listen(app.get('port'), () =>{
    //Conexión con mongoDB
    mongoose.connect(process.env.MONGODBURI).then(()=>{console.log("Conected to MongoDB");createRoles();})//<- Al hacer la conexión se ejecuta el metodo 'createRoles'
    .catch((error)=>console.log(error));
    console.log(`Server running in port: ${app.get('port')}`);//Mensaje de inicio de servidor
});
