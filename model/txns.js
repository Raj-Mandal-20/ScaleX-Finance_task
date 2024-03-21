const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    m5 : {
        buys : {
            type : Number,
            required : true,
        },
        sells : {
            type : Number,
            required : true,
        }

    },
    h1 : {
        buys : {
            type : Number,
            required : true,
        },
        sells : {
            type : Number,
            required : true,
        }

    },
    h6 : {
        buys : {
            type : Number,
            required : true,
        },
        sells : {
            type : Number,
            required : true,
        }

    },
    h24 : {
        buys : {
            type : Number,
            required : true,
        },
        sells : {
            type : Number,
            required : true,
        }

    },
    pairId : {
        type : Schema.Types.ObjectId,
        ref : 'Pair',
        required : true
    }
});


module.exports = mongoose.model('Transaction', transactionSchema);