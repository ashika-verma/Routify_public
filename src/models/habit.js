// import node modules
const mongoose = require('mongoose');

// define a schema
const HabitModelSchema = new mongoose.Schema({
    creator_id: String,
    text: String,
    timesDone: Number
});

// compile model from schema
module.exports = mongoose.model('HabitModel', HabitModelSchema);
