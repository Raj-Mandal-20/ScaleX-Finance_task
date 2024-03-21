const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pairSchema = new Schema({
        tradId : {
            type : Schema.Types.ObjectId,
            ref : 'Trading',
            required :true
        },
        chainId : {
            type : String, 
            required : true
        },
        dexid : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        },
        baseToken : {
            type : Schema.Types.ObjectId,
            ref : 'BaseToken',
            required : true
        },
        quoteToken : {
            type : Schema.Types.ObjectId,
            ref : 'QuoteToken',
            required : true
        },
        priceNative : {
            type : String, 
            required: true
        },
        priceUsd : {
            type : String, 
            required: true
        },
        txns : {
            type : Schema.Types.ObjectId,
            ref : 'Transaction'
        },
        volume : {
            type : Schema.Types.ObjectId,
            ref : 'Volume'   
            
        },
        priceChange : {
            type : Schema.Types.ObjectId,
            ref : 'PriceChange'            
        },
        liquidity : {
           type : Schema.Types.ObjectId,
           ref : 'Liquidity'
            
        },
        info : {
           type : Schema.Types.ObjectId,
           ref : 'Info',
        }    


}, {timestamps : {createdAt : 'pairCreatedAt'}});

module.exports = mongoose.model('Pair', pairSchema);