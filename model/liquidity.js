const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liquiditySchema = new Schema({
    usd : {
        type : Number, 
        required : true
    },
    base : {
        type : Number, 
        required : true
    },
    quote : {
        type : Number, 
        required : true
    },
    pairId : {
        type : Schema.Types.ObjectId,
        ref : 'Pair',
        required : true
    }
});


module.exports = mongoose.model('Liquidity', liquiditySchema);