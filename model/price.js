const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const priceSchema = new Schema({
    priceNative : {
        type : String, 
        required: true
    },
    priceUsd : {
        type : String, 
        required: true
    },
    pairId : {
        type : Schema.Types.ObjectId,
        ref : 'Pair',
        required : true
    }
})

module.exports = mongoose.model('Price', priceSchema);