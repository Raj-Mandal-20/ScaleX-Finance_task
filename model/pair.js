const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pairSchema = new Schema(
  {
    tradId: {
      type: Schema.Types.ObjectId,
      ref: "Trading",
      required: true,
    },
    chainId: {
      type: String,
      required: true,
    },
    dexId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    baseToken: {
      type: Schema.Types.ObjectId,
      ref: "BaseToken",
    },
    quoteToken: {
      type: Schema.Types.ObjectId,
      ref: "QuoteToken",
    },
    price: {
      type: Schema.Types.ObjectId,
      ref: "Price",
    },
    txns: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    volume: {
      type: Schema.Types.ObjectId,
      ref: "Volume",
    },
    priceChange: {
      type: Schema.Types.ObjectId,
      ref: "PriceChange",
    },
    liquidity: {
      type: Schema.Types.ObjectId,
      ref: "Liquidity",
    },
    info: {
      type: Schema.Types.ObjectId,
      ref: "Info",
    },
  },
  { timestamps: { createdAt: "pairCreatedAt" } }
);

pairSchema.pre('remove', async function (next) {
    console.log(this.baseToken)
  try {

    // this.baseToken && BaseToken.deleteOne({ _id: this.baseToken }),
    //   await Promise.all([
    //     this.quoteToken && QuoteToken.deleteOne({ _id: this.quoteToken }),
    //     this.price && Price.deleteOne({ _id: this.price }),
    //     this.txns && Transaction.deleteOne({ _id: this.txns }),
    //     this.volume && Volume.deleteOne({ _id: this.volume }),
    //     this.priceChange && PriceChange.deleteOne({ _id: this.priceChange }),
    //     this.liquidity && Liquidity.deleteOne({ _id: this.liquidity }),
    //     this.info && Info.deleteOne({ _id: this.info }),
    //     // Social.deleteOne({ _id: this.socials})
    //   ]);
    console.log("This RUn");
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Pair", pairSchema);
