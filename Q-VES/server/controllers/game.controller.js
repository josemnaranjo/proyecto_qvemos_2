const {Game} = require('../models/game.model');
const {Recommendation} = require('../models/recommendation.model');
const {User} = require('../models/user.model');
const shuffle = require('lodash.shuffle');



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

        const finalists = shuffle(finalistsArray).slice(0,3);

        res.json(finalists)

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear a los semifinalistas",
            err
        })
    }
};

module.exports.addVote = async (req,res) =>{
    try{
        const {id} = req.params;
        const {idRec} = req.body;
        
        const result = await Recommendation.findByIdAndUpdate(idRec,{
            $inc:{
                votes:1
            }
        },{new:true});

        const resultl2 = await Game.findByIdAndUpdate(id,{
            $push:{
                movies:result
            }
        },{new:true})

        res.json({result, resultl2});
    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear a los semifinalistas",
            err
        })
    }
};


module.exports.getWinner = async(req,res) =>{
    try{
        const finalistsOrdered= await Game.aggregate([
           {$unwind: "$movies"},
           {$sort:{"movies.votes":-1}}
        ]);
        res.json(finalistsOrdered)

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener el orden las películas",
            err
        });

    }
}