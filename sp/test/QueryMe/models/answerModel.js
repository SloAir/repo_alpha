var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var answerSchema = new Schema({
     'body': { type: String, required: true },
     'author': { type: Schema.Types.ObjectId, ref: 'User', required: true },
     'query': { type: Schema.Types.ObjectId, ref: 'Query', required: true },
     // parent answer, if the user answers to an answer
     'answerTo': { type: Schema.Types.ObjectId, ref: 'Answer' },
     // answers to this answer
     'answers': [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
     'metadata': {
          'upvotes': { type: Number, required: true },
          'downvotes': { type: Number, required: true },
          'created': { type: Date, required: true },
          'isChosenAnswer': { type: Boolean, required: true }
     }
});

module.exports = mongoose.model('answer', answerSchema);
