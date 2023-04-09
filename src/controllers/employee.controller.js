//CONTROLADOR DE EMPLEADO
const employeeSchema=require('../models/employee');
const Role =require('../models/Role')//Importar exquema role

//Crear nuevo empleado
const createEmployee=async(req,res)=>{
    const employee=employeeSchema(req.body);

    //Busca si el email ya ha sido registrado
    const searchEmployee=await 
    employeeSchema.aggregate([{$match:{email:{$eq:`${employee.email}`}}}]);
    //Desestructura el resultado de la búsqueda
    const [des]=searchEmployee;

    //Si no es indefinido devuelve un mensaje de error
    if(des){
        res.status(200).json(searchEmployee)  
        console.log(searchEmployee);
        res.status({message:"Error empleado ya registrado!"});
    
    //Si es indefinido registra un nuevo empleado
    }else{

        //Encripta la contraseña
        employee.password=await employeeSchema.encryptPassword(employee.password);

        //Asigna el rol de empleado
        const role=await Role.findOne({name:"employee"})
        employee.roles=[role._id];

        //Guarda el nuevo empleado
        const saveEmployee=await employee.save();

        //Devuelve el nuevo empleado guardado
        res.status(200).json(saveEmployee)    
    }

}

//Consultar todos los empleados
const getEmployees=async(req,res)=>{

    /*La consulta es una proyección que concatena el nombre y apellidos del empleado. Y los ordena por el nombre completo*/
    const listEmployees=await employeeSchema.aggregate([
        {$project:{
          fullname:{$concat:["$name"," ","$lastname"]},
          email:1,
          username:1,
          age:1,
          phone_number:1,
          roles:1,
          password:1
          }},
        {$sort:{fullname:1}}
      ]);
    //const listEmployees=await employeeSchema.aggregate([{$lookup:{from:"roles",localField:"roles",foreignField:"_id",as:"roles"}}])
    res.json(listEmployees);
}

//Consultar por id
const getById=async(req,res)=>{
    const employee=await employeeSchema.findById(req.params.id);
    res.json(employee);
}

//Consultar con ordenamiento por campo
const getSorter=async(req,res)=>{
    //Desestructurar parametros de la petición
    const {field,order}=req.params

    /*Realiza la consulta ordenando por campo (field) ordenado de forma ascendente o descendente (order)
    concatenando el nombre y apellidos del empleado*/
    const listEmployees=await employeeSchema.aggregate([{$project:{
        fullname:{$concat:["$name"," ","$lastname"]},
        email:1,
        username:1,
        age:1,
        phone_number:1,
        roles:1,
        password:1
    }},{$sort:{[field]:Number(order)}}]);
    //Devuelve la consulta
    res.json(listEmployees);
}
const getByTags=async(req,res)=>{
    //Desestructurar parametros de la petición
    const {field,value,orderField,order}=req.params;

    /*Realiza una busqueda donde el campo recibido (field) sea igual al valor recibido (value) y ordena por otro campo recibido (orderField)
    de manera ascendente o descendente según se indique (order) concatenando el nombre y apellidos del empleado*/
    const listEmployees=await employeeSchema.aggregate([
        {$project:{
          fullname:{$concat:["$name"," ","$lastname"]},
          email:1,
          username:1,
          age:1,
          phone_number:1,
          roles:1,
          password:1
          }},
          {
          $match: {
            [field]:{$eq:value}
          }},
        {$sort:{[orderField]:Number(order)}}
      ])
      //Devuelve la consulta
    res.json(listEmployees);
}

//Actualizar
const update=async(req,res)=>{
    const employee=employeeSchema(req.body);
    const update=await employeeSchema.findByIdAndUpdate(req.body._id,employee,{new:true});
    res.status(200).json({message:"Empleado Actualizado!"})
}

//Actualizar contraseña
const changePassword=async(req,res)=>{
    let {id,password}=req.body;
    password=await employeeSchema.encryptPassword(password);
    await employeeSchema.update({"_id":`${id}`},{"password":`${password}`});
    res.status(200).json({message:"Contraseña Actualizada!"});
}

//Eliminar
const deleteEmployee=async(req,res)=>{
    let {id}=req.params;
    await employeeSchema.remove({_id:`${id}`});
    res.status(200).json({message:"Empleado eliminado"});
}

//Exportar métodos
module.exports={
    getEmployees,
    createEmployee,
    getById,
    update,
    changePassword,
    deleteEmployee,
    getSorter,
    getByTags
}