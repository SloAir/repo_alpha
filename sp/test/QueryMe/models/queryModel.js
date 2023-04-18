var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var querySchema = new Schema({
     'title': { type: String, required: true },
     'body': { type: String, required: true },
     'author': { type: Schema.Types.ObjectId, ref: 'User', required: true },
     'answers': [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
     'tags': [{ type: String }],
     'metadata': {
          'views': { type: Number, required: true },
          'upvotes': { type: Number, required: true },
          'downvotes': { type: Number, required: true },
          'created': { type: Date, required: true },
          'lastModified': { type: Date, required: true },
          'wasModified': { type: Boolean },
          'isSolved': {type: Boolean, required: true }
     }
});

module.exports = mongoose.model('query', querySchema);
