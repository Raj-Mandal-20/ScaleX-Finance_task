const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    m5 : {
       type : Schema.Types.ObjectId,
       ref : 'BuySell',

    },
    h1 : {
       type : Schema.Types.ObjectId,
       ref : 'BuySell',

    },
    h6 : {
        type : Schema.Types.ObjectId,
        ref : 'BuySell',
    },
    h24 : {
        type : Schema.Types.ObjectId,
        ref : 'BuySell',

    },
    pairId : {
        type : Schema.Types.ObjectId,
        ref : 'Pair',
        required : true
    }
});


module.exports = mongoose.model('Transaction', transactionSchema);