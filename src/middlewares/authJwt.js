const jwt=require('jsonwebtoken');
const config=require('../config');
const Employee = require('../models/employee');
const verifyToken=async(req,res,next)=>{
    const token=req.headers["x-access-token"];
    // const token=req.headers["Authorization"];

    console.log(token);
    if(!token) return res.status(403).json({message:"No token provided"});
    const decoded=jwt.verify(token, config.SECRET);

    const employee=await Employee.findById(decoded.id,{password:0});
    if(!employee) return res.status(404).json({message:"No user found"});

    next();
}
module.exports={
    verifyToken,
}