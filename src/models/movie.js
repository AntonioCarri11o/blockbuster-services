//ESQUEMA MONGOOSE DE MOVIE

//Importación de mongoose
const {mongoose,Schema}= require('mongoose');
const {appConfig} =require('../config');


//Atributos del esquma 'Movie'
const movieSchema=mongoose.Schema(
    {
        "tittle":{type:String},
        "duration":{type:String},
        "price":{type:Number},
        "stock":{type:Number},
        "producer":{type:String},
        "languages":[],
        "status":{type:String},
        "genre":[],
    }
);

//Exportar esquema
module.exports=mongoose.model("Movie",movieSchema);