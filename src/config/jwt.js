const jwt = require('jsonwebtoken');//Librería de token

//Generar token
const generateToken=(payload)=>{
    return jwt.sign(payload,process.env.SECRET); 
}

//Validar token
const auth=async (req,res,next)=>{
    try{
        const token = req.headers.authorization?.replace('Bearer','');
        if(!token) throw Error('');
        const decodeToken=jwt.verify(token,process.env.SECRET);
        req.token=decodeToken;
        next();
    }catch{
        res.status(401).json({message:'Unauthorized'});
    }
}

const checkRoles = (roles) =>{
    return async (req,res,next) =>{
        try{
            const token = req.token; 
            if(!token) throw Error('');
            if(!roles.some(role => role === token.role))throw Error('');           
            next(); 
        }catch(error){
            res.status(401).json({message:'Unathorized'});
        }
    }
}
module.exports={
    checkRoles,
    auth,
    generateToken
}