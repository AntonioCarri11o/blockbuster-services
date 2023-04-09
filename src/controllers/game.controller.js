const express = require('express');
const gameSchema= require('../models/game');

const getImages=(req,res)=>{
    res.sendFile('../storage/imgs/movies/spider.jpg',{root:__dirname});
}

const createGame= async(req,res)=>{
    const game=gameSchema(req.body);
    console.log(game);

    const searchGame= await gameSchema.aggregate([{$match:{tittle:{$eq:game.tittle}}}]);
    const [body]=searchGame;
    if(body){
        res.status(400).json({message:"Error juego ya registrado!"})
    }else{
        if(game.stock<1){
            game.status="Agotado"
        }else{
            game.status="Disponible"
        }
        await game.save();
        res.status(200).json({message:"Juego registrado con exito!",game})
    }
}

const getGames= async(req,res)=>{
    const listGames= await gameSchema.find();
    res.json(listGames);
}
const getSorter=async(req,res)=>{
    const {field,order}=req.params;
    const listGames=await gameSchema.aggregate([{$sort:{[field]:Number(order)}}]);
    res.json(listGames);
}
const getByTags=async(req,res)=>{
    const {field,value,orderField,order}=req.params;
    const listGames=await gameSchema.find({$or:[{[field]:{$all:[`${value}`]}},{[field]:value}]}).sort({[orderField]:order})
    res.json(listGames);
}
const update=async(req,res)=>{
    await gameSchema.findByIdAndUpdate(req.body._id,req.body,{new:true});
    res.status(200).json({message:"Juego actualizado con éxito!"});
};

const deleteGame=async(req,res)=>{
    const {id}=req.params;
    await gameSchema.remove({_id:`${id}`});
    res.status(200).json({message:"Juego elimnado"})
}
module.exports={
    createGame,
    getGames,
    update,
    deleteGame,
    getSorter,
    getByTags
}