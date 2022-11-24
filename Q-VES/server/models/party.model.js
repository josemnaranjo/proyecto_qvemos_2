const mongoose = require('mongoose');
const {RecommendationSchema} = require('./recommendation.model');

const PartySchema =  new mongoose.Schema({
    Movies: [RecommendationSchema],
},{timestamps:true});

const Party = mongoose.model("Party",PartySchema);
module.exports = {PartySchema,Party};
