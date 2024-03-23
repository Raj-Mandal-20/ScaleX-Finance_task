const Volume = require("../model/volume");
const Pair =  require('../model/pair');
const {
  Types: { ObjectId },
} = require("mongoose");
exports.fetchVolumes = (req, res, next) => {
  Volume.find()
    .then((volumes) => {
      res.status(200).json({
        volumes: volumes,
      });
    })
    .catch((err) => next(err));
};

exports.updateVolume = (req, res, next) => {
  const pairId = req.params.pairId;

  // Check if pairId is undefined or null
  if (!pairId) {
    return res.status(400).json({ error: "pairId is required" });
  }

  const id = new ObjectId(pairId);
  console.log(id.toString());
  Pair.findById({ _id: id.toString() })
    .then((pair) => {
      if (!pair) {
        throw new Error("No pair Found");
      }

      const volumeId = new ObjectId(pair.volume);
      return Volume.findById({ _id: volumeId.toString() });
    })
    .then((volume) => {
      volume.h24 = req.body.h24;
      volume.h6 = req.body.h6;
      volume.h1 = req.body.h1;
      volume.m5 = req.body.m5;
      return volume.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Volume Updated Successfully",
      });
    })
    .catch((err) => {

      next(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
