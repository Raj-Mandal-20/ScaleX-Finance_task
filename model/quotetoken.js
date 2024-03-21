const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteTokenSchema = new Schema({
    quoteToken : {
        address : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        },
        symbol : {
            type : String,
            required : true
        },
        pairId : {
            type : Schema.Types.ObjectId,
            ref : 'Pair',
            required : true
        }
    },
    
});

module.exports = mongoose.model('QuoteToken', quoteTokenSchema);
