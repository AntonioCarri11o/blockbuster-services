//CONTROLADOR DE AUTH
const Employee= require("../models/employee");//Importación de esquema Employee
const jwt=require('jsonwebtoken');//Libreariá para generación de token
const config=require('../config');
const Role=require('../models/Role');//Importación de esquem Role

//Registro de empleado
const signUp=async(req,res)=>{
    //Desestructuración del cuerpo de la petición (req) en constantes
    const {_id,username,email,pass,roles}=req.body;

    const newEmployee= new Employee({
        _id,
        username,
        email,
        //Encriptar contraseña
        password:await Employee.encryptPassword(pass)    
    });

    //Si role no está indefinido busca en la tabla 'roles' y lo asigna como documento embebido
    if(roles){
        const foundRoles=await Role.find({name:{$in:roles[0]}})
        newEmployee.roles=foundRoles.map(role=>role._id)

    //Si roles es indefinido asigna el rol de empleado pr defecto
    }else{
        const role=await Role.findOne({name:"employee"})
        newEmployee.roles=[role._id];
    }

    //Registra el nuevo empleado
    const savedEmployee=await newEmployee.save();

    //Generar token
    const token=jwt.sign({id:savedEmployee._id},config.SECRET,{expiresIn:86400})

    //Decolver token como json
    res.json({token});
}

//Iniciar sesión
const signIn=async(req,res)=>{
    //Buscar empleado por email
    const emp=await Employee.findOne({$or:[{email:{$eq:req.body.email}},{username:{$eq:req.body.email}}]}).populate("roles");
    
    //Si no lo encuentra devuelve un mensaje de error
    if(!emp) return res.status(400).json({message:"Employee not found"});
    const matchPassword=await Employee.comparePassword(req.body.password,emp.password);

    //Si lo encuentra pero la contraseña es incorrecta devuelve un mensaje de error
    if(!matchPassword) return res.status(401).json({token:null, message:"Invalid password"});

    //Generar token
    const token=jwt.sign({id:emp._id}, config.SECRET,{ expiresIn:86400});
    const [role]= emp.roles;

    //Si encuentra el empleado y la contraseña es correcta devuelve el token y el nombre del rol
    res.json({token,"role":role.name});
}

//Exportar métodos
module.exports={
    signUp,
    signIn,
}