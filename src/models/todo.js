// import node modules
const mongoose = require('mongoose');

// define a schema
const TodoModelSchema = new mongoose.Schema({
    creator_id: String,
    text: String,
    complete: Boolean
});

// compile model from schema
module.exports = mongoose.model('TodoModel', TodoModelSchema);
