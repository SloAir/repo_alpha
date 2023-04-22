const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const spaceSchema = new Schema({
    title: {
        type: "string",
        required: true
    },
    link: {
        type: "string",
        required: true
    },
    icon: {
        type: "string",
        required: true
    }
});

module.exports = mongoose.model('space', spaceSchema);
