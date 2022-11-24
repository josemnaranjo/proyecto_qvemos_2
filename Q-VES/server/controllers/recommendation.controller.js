const {Recommendation} = require('../models/recommendation.model');
// const {Party} = require('../models/party.model');
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
}