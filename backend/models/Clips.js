const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClipSchema = new Schema({
    clipName:{
        type: String,
        required: true,
        unique: true
    },
    clipContent:{
        type: String,
        required: true
    },
    file:{
        type: String,
    },
    destroy_on:{
        type: String
    },
    created_on:{
        type: Date,
        default: Date.now
    }
});

const Clip = mongoose.model('clip', ClipSchema);
module.exports = Clip;