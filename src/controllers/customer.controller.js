//CONTROLADOR DE CUSTOMER
const customerSchema= require("../models/customer");

//Crear Nuevo
const createCustomer=async(req,res)=>{
    const customer=customerSchema(req.body);
    const saveCustomer=await customer.save();
    //res.status(200).json({message:"Cliente insertado!"});
    res.json(saveCustomer._id);
}

//Listar todos sin filtro ni ordenamiento
const getCustomers= async(req, res)=>{
    const result=await customerSchema.find();
    res.json(result);
}

//Listar con ordenaminto por campo
const getSorter=async(req,res)=>{
    //Desestructurar parametros de la petición
    const {field,order}=req.params;

    //Realiza la consulta ordenando por campo (field) ordenado de forma ascendente o descendente (order)
    const listCustomers=await customerSchema.aggregate([{$sort:{[field]:Number(order)}}]);
    res.json(listCustomers);
}
const getByTags=async(req,res)=>{
    //Desestructurar parametros de la petición
    const {field,value,orderField,order}=req.params;

    /*Realiza una busqueda donde el campo recibido (field) sea igual al valor recibido (value) y ordena por otro campo recibido (orderField)
    de manera ascendente o descendente según se indique (order)*/
    const listCustomers= await customerSchema.aggregate([{$match:{[field]:value}},{$sort:{[orderField]:Number(order)}}])

    //Devuelve el resultado
    res.json(listCustomers);
}

//Consultar por id
const getById=async(req,res)=>{
    const customer=await customerSchema.findById(req.params.id);
    res.json(customer);
}

//Actualizar
const updateCustomer=async(req,res)=>{
    const customer=await customerSchema.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(200).json({message:"Cliente actualizado!"});
}

//Exportar métodos
module.exports={
    getCustomers,
    createCustomer,
    updateCustomer,
    getById,
    getSorter,
    getByTags
}