const Trading = require("../model/trading");
const Pair = require("../model/pair");

exports.createTradId = (req, res, next) => {
  const trading = new Trading({
    pairs: [],
  });

  trading
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Trading ID Created Successfully",
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.postTrading = (req, res, next) => {
  const chainId = req.body.chainId;
  const dexId = req.body.dexId;
  const url = req.body.url;

  const trading = new Trading({
    pairs: [],
  });
//   const pair = new Pair({
//     chainId: chainId,
//     dexId: dexId,
//     url: url,
//   });
  let trader;
  let exPair;
  trading
    .save().then( trad =>{
        trader = trad;
        const pair = new Pair({
            tradId : trad._id.toString(),
            chainId: chainId,
            dexId: dexId,
            url: url,
        });
        exPair = pair;
        return pair.save();
    }).then(pairInfo => {
        trader.pairs.push(exPair);
        return trader.save();
       
    }).then(savedTrad =>{
        res.status(200).json({
            message : 'Trading Successful!',
            data : savedTrad
        })
    })
    .catch(err => console.log(err));


};
