const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradingSchema = new Schema({
    schemaVersion : {
        type : String, 
        default : '1.0.0'
    },
    pairs : [{
        type : Schema.Types.ObjectId,
        ref : 'Pair'
    }],    
});



module.exports = mongoose.model('Trading', tradingSchema);