//ESQUEMA MONGOOSE DE SALE

//Importación de mongoose
const {Schema, model,default:mongoose}=require('mongoose');


//Atributos del esquma 'Sale'
const saleSchema= new Schema(
    {
        "productType":{type:String},
        
        //Documento embebido con tablas Movie y Game
        "product":[{ref:"Sale",type:mongoose.Schema.Types.ObjectId},{ref:"Game",type:mongoose.Schema.Types.ObjectId}],

        //Documento embebido con tabla Customer
        "customer":{ref:"Customer",type:mongoose.Schema.Types.ObjectId},
        "price":{type:Number},
        "quantity":{type:Number},
        "total":{type:Number},
        "saleDate":{type:Date},
    },
    {
        timestamps:true,
        versioKey:false
    }
)

//Exportar esquema
module.exports=mongoose.model("Sale",saleSchema);