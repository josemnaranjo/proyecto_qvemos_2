const {Recommendation} = require('../models/recommendation.model');
const {Party} = require('../models/party.model');

module.exports.addRecommendation = async (req,res) => {
    try{
        const {userId} =req.params;
        const {title,genre,score,votes} = req.body;
        const recommendation = new Recommendation({title,genre,score,votes,userId});
        const partyRecommendation = new Party({});
        partyRecommendation.Movies.push(recommendation);
        await recommendation.save();
        await partyRecommendation.save();
        res.json({message:"Exito",title:title,genre:genre,score:score,votes:votes,userId:userId})

    }catch(err){
        res.status(500).json({
            message: "No hemos podido crear tu recomendacion",
            err
        })
    }
}