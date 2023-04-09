//ESQUEMA MONGOOSE DE CUSTOMER

//Importación de mongoose
const mongoose=require("mongoose");


//Atributos del esquma 'Customer'
const customerSchema=mongoose.Schema({
    "name":{
        type:String,
        required:true
    },
    "address":{
        type:String,
        required:true,
    },
    "phone_number":{
        type:String,
        required:true
    }

});
//Exportar esquema
module.exports=mongoose.model('Customer',customerSchema);