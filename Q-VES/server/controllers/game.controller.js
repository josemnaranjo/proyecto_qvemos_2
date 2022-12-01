const { Types } = require('mongoose');
const {Game} = require('../models/game.model');
const {Recommendation} = require('../models/recommendation.model');
const {User} = require('../models/user.model');


module.exports.createNewGame = async (req,res) => {
    try{
        const {name} =req.body;
        console.log(name);
        const game = await Game.create({name});
        res.json({id:game.id})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear la colección",
            err
        })
    }
};

module.exports.addRecommendation = async (req,res) => {
    try{
        const {id} =req.params;

        const {title,genre,score,votes,userId} = req.body;

        const recommendation = await Recommendation.create({title,genre,score,votes});

        const userById = await User.findByIdAndUpdate(userId,{
            $push:{
                recommendations: recommendation
            }
        });

        const game = await Game.findByIdAndUpdate(id,{
            $push:{
                movies:recommendation
            }
        });

        res.json({message:"Exito",title:title,genre:genre,userCreator:userId,game:game})
        

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear la colección",
            err
        })
    }
}; 

module.exports.getThreeFinalists = async (req,res) => {
    try{
        const collection = req.params;
        const id = collection.id
        const game = await Game.findById(id);
        const finalistsArray = game.movies;

        const finalists = finalistsArray.sort(()=> Math.random()- Math.random()).slice(0,3);

        res.json(finalists)
    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear a los semifinalistas",
            err
        })
    }
}