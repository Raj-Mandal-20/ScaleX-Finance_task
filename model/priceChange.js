const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceChangeSchema = new Schema({
    h24 : {
        type : Number,
        required : true
    },
    h6 : {
        type : Number,
        required : true
    },
    h1 : {
        type : Number,
        required : true
    },
    m5 : {
        type : Number,
        required : true
    },
    pairId : {
        type : Schema.Types.ObjectId,
        ref : 'Pair',
        required : true
    }
});


module.exports = mongoose.model('PriceChange', priceChangeSchema);