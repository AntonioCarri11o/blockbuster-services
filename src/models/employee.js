//ESQUEMA MONGOOSE DE EMPLOYEE

//Importación de mongoose
const {mongoose,Schema}=require("mongoose");
const bcrypt=require('bcryptjs');//Librería de encriptado



//Atributos del esquma 'Customer'
const employeeSchema=mongoose.Schema(
    {
    "name":{type:String},
    "lastname":{type:String},
    "email":{type:String},
    "username":{type:String},
    "password":{type:String},
    "age":{type:Number},
    "phone_number":{type:String},

    //Documento embebido
    "roles":[{ref:"Role",type:mongoose.Schema.Types.ObjectId}]
    },
    {
        timestamps:true,
        versioKey:false
    }
);

//Encriptar contraseña con el método encryptPassword
employeeSchema.statics.encryptPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

//Comparar contraseñas
employeeSchema.statics.comparePassword=async(password,receivedPassword)=>{
    return await bcrypt.compare(password,receivedPassword)
}

//Exportar esquema
module.exports=mongoose.model("Employee",employeeSchema);