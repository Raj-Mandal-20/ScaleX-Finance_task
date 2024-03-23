const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    imageUrl : {
        type : String,
        required : true
    },
    websites : [{
        type : Schema.Types.ObjectId,
        ref : 'Website'
    }],
    socials : [{
       type : Schema.Types.ObjectId,
       ref : 'Social'
    }],
    pairId : {
        type : Schema.Types.ObjectId,
        ref : 'Pair',
        required : true
    }

});

module.exports = mongoose.model('Info', infoSchema);
