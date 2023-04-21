const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required'
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }  
});

entrySchema.index({ "$**" : 'text' });
module.exports = mongoose.model('Entry', entrySchema);