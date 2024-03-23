const Price = require("../model/price");
const Pair = require("../model/pair");
const {
  Types: { ObjectId },
} = require("mongoose");

exports.fetchPrices = (req, res, next) => {
  Price.find()
    .then((prices) => {
      res.status(200).json({
        prices: prices,
      });
    })
    .catch((err) => next(err));
};

exports.updatePrice = (req, res, next) => {
  // Valid pairId is needed to update the price
  const pairId = req.params.pairId;

  const id = new ObjectId(pairId);
  Pair.findById({ _id: id.toString() })
    .then((pair) => {
      console.log(pair);
      if (!pair) {
        throw new Error("No pair Found");
      }

      const priceId = new ObjectId(pair.price);
      return Price.findById({ _id: priceId.toString() });
    })
    .then((price) => {
      price.priceNative = req.body.priceNative;
      price.priceUsd = req.body.priceUsd;
      return price.save();
    })
    .then(() => {
      res.status(200).json({
        message : 'Price Updated Successfully'
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal Server Error' });
      next(err);
    });
};