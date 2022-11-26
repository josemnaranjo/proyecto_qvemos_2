const mongoose = require('mongoose');
const {RecommendationSchema} = require('./recommendation.model');

const FourFinalistsSchema =  new mongoose.Schema({
    Movies:[RecommendationSchema]
},{timestamps:true});

const FourFinalists = mongoose.model("FourFinalists",FourFinalistsSchema);
module.exports = {FourFinalistsSchema,FourFinalists};
