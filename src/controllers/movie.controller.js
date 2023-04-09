const express = require("express");
const movieSchema = require("../models/movie");
const getImages=(req,res)=>{
  res.sendFile('../storage/imgs/movies/spider.jpg',{root:__dirname});
}

const createMovie = async (req, res) => {
  const movie = movieSchema(req.body);
  console.log(movie);
  /*
  const movie=movieSchema({
    tittle,
    duration,
    price,
    stock,
    producer,
    languages,
    status,
    genre,
    filename
  })
  */
  const searchMovie= await movieSchema.aggregate([{$match:{tittle:{$eq:movie.tittle}}}])
  const[body]=searchMovie;
  if(body){
    //console.log(searchMovie);
    res.status(400).json({message:"Error película ya registrada"});
  }else{
    const saveMovie = await movie.save();
    res.status(200).json({message:"Pelicula registrada con exito",movie});
  }
};

const getMovies = async (req, res) => {
  const listMovies = await movieSchema.find();
  const [...body]= await movieSchema.aggregate([{$project:{"filename":1,"_id":0}}]);
  res.json(listMovies);
};

const getById = async (req, res) => {
  const movie = await movieSchema.findById(req.params.id);
  console.log(req.params.extra)
  res.json(movie);
};

const getSorter= async(req,res)=>{
  const {field,order}=req.params;
  const listMovies=await movieSchema.aggregate([{ $sort:{[field]:Number(order)}}]);
  res.json(listMovies);
}

const getBytags=async(req,res)=>{
  const {field,name,orderField,order}=req.params;
  const listMovies=await movieSchema.find({$or:[{[field]:{$all:[`${name}`]}},{[field]:name}]}).sort({[orderField]:order})
  res.json(listMovies);
}

const getByName = async (req, res) => {
    const tittle=req.body.tittle;
    const movie = await movieSchema.aggregate([{ $match:{tittle:{$eq:tittle}}}]);
  res.json(movie);
};
const update = async (req, res) => {
  const movie = await movieSchema.findByIdAndUpdate(req.body._id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "Pelicula actualizada" });
};
const deleteMovie=async(req,res)=>{
  const {id}=req.params;
  await movieSchema.remove({_id:`${id}`});
  res.status(200).json({message:"Película eliminada"});
}

module.exports = {
  getMovies,
  createMovie,
  getById,
  getByName,
  update,
  deleteMovie,
  getImages,
  getSorter,
  getBytags
};
