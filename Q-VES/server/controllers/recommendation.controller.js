const {Recommendation} = require('../models/recommendation.model');
const {ThreeFinalists} = require('../models/threeFinalists.model');
const {User} = require('../models/user.model');

module.exports.addRecommendation = async (req,res) => {
    try{
        const user = req.params;
        const id = user.id;
        const {title,genre,score,votes} = req.body;
        const recommendation = await Recommendation.create({title,genre,score,votes, userCreator:id});
        
        const userById = await User.findByIdAndUpdate(id,{
            $push:{
                recommendations: recommendation
            }
        });

        res.json({message:"Exito",title:title,genre:genre,userCreator: id})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear tu recomendacion",
            err
        })
    }
};


module.exports.createFinalistsCollection = async (req,res) =>{
    try{
        const finalists = await ThreeFinalists.create({});
        res.json({id:finalists.id})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear la colección",
            err
        })
    }
}


module.exports.getThreeFinalists = async (req,res) =>{
    try{
        const collection = req.params;
        const id = collection.id
        const threeMovies = await Recommendation.aggregate([
            {
                $sample:{size:3},
            }
        ]);
        const finalists = await ThreeFinalists.findByIdAndUpdate(id,{
            $push:{
                Movies: threeMovies
            }
        })


        res.json({finalists:finalists})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear a los semifinalistas",
            err
        })
    }
};


module.exports.getFinalists = async(req,res) =>{
    try{
        const result = req.params;
        const id = result.id;
        const finalists = await ThreeFinalists.findById(id);

        res.json({movies:finalists.Movies});

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener a los semifinalistas",
            err
        });
    }
}

module.exports.addVoteToRecommendation = async(req,res) =>{
    try{
        const {id} = req.params;
        const {_id} = req.body;

        const result = await Recommendation.findByIdAndUpdate(id,{
            $inc:{
                votes:1
            }
        },{new:true, runValidators:true});
         const resutl2 = await ThreeFinalists.findByIdAndUpdate(_id,{
            $push:{
                Movies:result
            }
         })

        res.json({result,resutl2});

    }catch(err){
        res.status(500).json({
            message: "No hemos podido enviar tu voto",
            err
        });
    }
}




module.exports.getWinner = async(req,res) =>{
    try{
        const result= await ThreeFinalists.aggregate([
           {$unwind: "$Movies"},
           {$sort:{"Movies.votes":-1}}
        ]);
        res.json(result)

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener el orden las películas",
            err
        });

    }
}


