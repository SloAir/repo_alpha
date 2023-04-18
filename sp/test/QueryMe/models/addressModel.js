var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var addressSchema = new Schema({
     'street': { type: String, required: true },
     // type: String, because house number can be '7a' for example
     'houseNumber': { type: String, required: true },
     'city': { type: String, required: true },
     'zipCode': { type: Number, required: true },
     'country': { type: String, required: true },
     'user': { type: Schema.Types.ObjectId, ref: 'User', 'required': true }
});

module.exports = mongoose.model('address', addressSchema);
