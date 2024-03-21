const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    websites : [{
        label : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        },
        infoId : {
            type : Schema.Types.ObjectId,
            ref : 'Info',
            required : true
        }
    }],
    

});

module.exports = mongoose.model('Website', websiteSchema);
