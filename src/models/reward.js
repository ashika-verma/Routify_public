// import node modules
const mongoose = require('mongoose');

// define a schema
const RewardModelSchema = new mongoose.Schema({
    creator_id: String,
    text: String,
    reward: Number
});

// compile model from schema
module.exports = mongoose.model('RewardModel', RewardModelSchema);
