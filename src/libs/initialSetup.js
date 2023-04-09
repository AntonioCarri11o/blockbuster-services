const Role =require('../models/Role');

const createRoles=async()=>{
    try{
        const count =await Role.estimatedDocumentCount()
        if(count>0)return;
    
        const values =await Promise.all([
            new Role({name:'employee',description:'Usuario con permisos para realizar ventas, agregar clientes y consultar las tablas de productos',status:1}).save(),
            new Role({name:'admin',description:"Usuario con permisos para gestionar empleados, productos, roles, y consultar ventas e informes de ventas",status:1}).save()
        ]);
        console.log(values);
    }catch(error){
        console.error(error);
    }

}
module.exports={
    createRoles,
}