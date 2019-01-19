// import node modules
const mongoose = require('mongoose');

// define a schema
const LongTermModelSchema = new mongoose.Schema({
    creator_id: String,
    text: String,
    percentage: Number,
    complete: Boolean
});

// compile model from schema
module.exports = mongoose.model('LongTermModel', LongTermModelSchema);
