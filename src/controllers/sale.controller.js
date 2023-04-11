const express= require('express');
const saleSchema=require('../models/sale');
const movieSchema=require('../models/movie');
const customerShema=require('../models/customer');

const newSale=async(req, res)=>{
    const customer=customerShema(req.body.customer);
    const product=req.body.product._id;
    const response=await customer.save();
    req.body.customer._id=response._id;
    sale=saleSchema(req.body);
    const now=Date.now();
    const today=new Date(now);
    sale.saleDate=today;
    const saveSale=await sale.save();
    console.log(product);
    const stock=await movieSchema.findById(product);
    //const updateStock=await movieSchema.update({"_id":`${product}`},"stock")
    stock.stock=stock.stock-sale.quantity;
    const movie=await movieSchema.findByIdAndUpdate(product,{stock:stock.stock})
    res.status(200).json({message:"Venta reliazada con éxito"});
}

const getSales= async(req,res)=>{
    //const salesList=await saleSchema.find();
    const salesList=await saleSchema.aggregate([
        {$lookup:{from:"games",localField:"product",foreignField:"_id",as:"game"}},
        {$lookup:{from:"movies",localField:"product",foreignField:"_id",as:"movie"}},
        {$lookup:{from:"customers",localField:"customer",foreignField:"_id", as:"customer"}}
    ])
    res.status(200).json(salesList);
}

const getById= async(req,res)=>{
    const sale=await saleSchema.findById(req.params.id);
    res.status(200).json(sale);
}

const getByCustomer=async(req,res)=>{
  const {field,value}=req.params;
  const sale=await saleSchema.aggregate([
    {$lookup:{from:"customers",localField:"customer",foreignField:"_id", as:"customer"}},
    {$match:{[`customer.${field}`]:{$eq:value}}}
  ])
  res.status(200).json(sale);
}

const getByProduct=async(req,res)=>{
const {field,value}=req.params;
const salesList=await saleSchema.aggregate([
  {$lookup:{from:"games",localField:"product",foreignField:"_id", as:"game"}},
  {$lookup:{from:"movies",localField:"product",foreignField:"_id", as:"movie"}},
  {$match:{
    $or:[{[`movie.${field}`]:{$eq:value}},{[`game.${field}`]:{$eq:value}}]
  }}
])
res.status(200).json(salesList);
}

const getGain=async(req,res)=>{
const sales=await saleSchema.aggregate([
  {$group:{_id:null,Ganancias:{$sum:"$total"}}}
]);
res.status(200).json(sales);
}
const getByPriceR=async(req,res)=>{
const {gte,lte}=req.params;
const salesList=await saleSchema.aggregate([
  {$lookup:{from:"games",localField:"product",foreignField:"_id",as:"game"}},
  {$lookup:{from:"movies",localField:"product",foreignField:"_id",as:"movie"}},
  {$match:{$and:[{price:{$gte:Number(gte)}},{price:{$lte:Number(lte)}}]}},
  {$project:{
    "movie.tittle":1,
    "game.tittle":1,
    price:1
  }}
])
res.status(200).json(salesList);
}

const update=async(req,res)=>{
    const sale=await saleSchema.findByIdAndUpdate(req.body._id,req.body,{new:true});
}

module.exports={
    newSale,
    getSales,
    getById,
    getByCustomer,
    getByProduct,
    getGain,
    getByPriceR,
    update
}

/* CONSULTAR CON EMBEBIDOS
db.sales.aggregate([
  {
  $lookup:{
    from:"games",
    localField:"product",
    foreignField:"_id",
    as:"product"
  }
},
{
  $lookup:{
    from:"customers",
    localField:"customer",
    foreignField:"_id",
    as:"customer"
  }
}
]);
*/