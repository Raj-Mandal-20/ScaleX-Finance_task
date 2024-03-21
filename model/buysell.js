const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buysellSchema = new Schema({
    buys : {
        type : Number,
        // required : true,
    },
    sells : {
        type : Number,
        // required : true,
    },
    txnId : {
        type : Schema.Types.ObjectId,
        ref : 'Transaction',
        required : true,
    }
})


module.exports = mongoose.model('BuySell', buysellSchema);