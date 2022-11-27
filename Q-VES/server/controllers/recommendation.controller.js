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
        res.json({finalists})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener los semifinalistas",
            err
        })
    }
}


module.exports.getThreeFinalists = async (req,res) =>{
    try{
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


        res.json({finalists})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido obtener los semifinalistas",
            err
        })
    }
};





