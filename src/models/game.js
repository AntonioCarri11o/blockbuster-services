////ESQUEMA MONGOOSE DE GAME

//Importación de mongoose
const {mongoose, Schema}=require('mongoose');
const {appConfig}=require('../config')


//Atributos del esquma 'Game'
const gameSchema=mongoose.Schema(
    {
        "tittle":{type:String},
        "price":{type:Number},
        "stock":{type:Number},
        "rate":{type:Number},
        "description":{type:String},
        "languages":[],
        "genre":{type:String},
        "status":{type:String},
        "studio":{type:String},
    }
)

//Exportar esquema
module.exports=mongoose.model("Game",gameSchema);