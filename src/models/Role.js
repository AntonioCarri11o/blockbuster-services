//ESQUEMA MONGOOSE DE ROLE

//Importación de mongoose
const {Schema,model, default: mongoose} =require('mongoose');

//Atributos del esquma 'Role'
const roleSchema=new Schema(
    {name:String},
    {description:String},
    {status:Number},
    {versionKey:false}
);
//Exportar esquema
module.exports=mongoose.model("Role",roleSchema);