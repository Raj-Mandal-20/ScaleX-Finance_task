const Trading = require("../model/trading");
const Pair = require("../model/pair");
const BaseToken = require("../model/basetoken");
const QuoteToken = require("../model/quotetoken");
const Volume = require("../model/volume");
const Price = require("../model/price");
const PriceChange = require("../model/priceChange");
const Liquidity = require("../model/liquidity");
const Transaction = require("../model/txns");
const Info = require("../model/info");
const Website = require("../model/website");
const Social = require("../model/socials");
const {
  Types: { ObjectId },
} = require("mongoose");

exports.createTradId = (req, res, next) => {
  Trading.findOne()
    .then((trad) => {
      if (!trad) {
        const trading = new Trading({
          pairs: [],
        });
        return trading.save();
      } else {
        req.tradId = trad;
        return trad;
      }
    })
    .then((trad) => {
      req.tradId = trad;
      next();
    })
    .catch((err) => next(err));
};

exports.postTrading = (req, res, next) => {
  const chainId = req.body.chainId;
  const dexId = req.body.dexId;
  const url = req.body.url;
  const priceNative = req.body.priceNative;
  const priceUsd = req.body.priceUsd;
  const baseTokenName = req.body.baseToken.name;
  const baseTokenAddress = req.body.baseToken.address;
  const baseTokenSymbol = req.body.baseToken.symbol;

  let trader = req.tradId;

  let baseToken,
    quoteToken,
    txns,
    volume,
    priceChange,
    liquidity,
    info,
    price,
    websites,
    socials;

  let pairCpy, infoCpy;
  // console.log(trader);

  const pair = new Pair({
    tradId: trader._id,
    chainId: chainId,
    dexId: dexId,
    url: url,
  });

  pair
    .save()
    .then((pairIns) => {
      pairCpy = pairIns;
      price = new Price({
        priceNative: priceNative,
        priceUsd: priceUsd,
        pairId: pairCpy._id,
      });

      return price.save();
    })
    .then((savedPrice) => {
      pairCpy.price = savedPrice._id;
      baseToken = new BaseToken({
        name: baseTokenName,
        address: baseTokenAddress,
        symbol: baseTokenSymbol,
        pairId: pairCpy._id,
      });

      return baseToken.save();
    })
    .then((resBaseToken) => {
      pairCpy.baseToken = resBaseToken._id;
      quoteToken = new QuoteToken({
        name: req.body.quoteToken.name,
        address: req.body.quoteToken.address,
        symbol: req.body.quoteToken.symbol,
        pairId: pairCpy._id,
      });

      return quoteToken.save();
    })
    .then((resQuoteToken) => {
      pairCpy.quoteToken = resQuoteToken._id;

      txns = new Transaction({
        m5: {
          buys: req.body.txns.m5.buys,
          sells: req.body.txns.m5.sells,
        },
        h1: {
          buys: req.body.txns.h1.buys,
          sells: req.body.txns.h1.sells,
        },
        h6: {
          buys: req.body.txns.h6.buys,
          sells: req.body.txns.h6.sells,
        },
        h24: {
          buys: req.body.txns.h24.buys,
          sells: req.body.txns.h24.sells,
        },
        pairId: pairCpy._id,
      });

      return txns.save();
    })
    .then((savedTxns) => {
      pairCpy.txns = savedTxns._id;
      priceChange = new PriceChange({
        m5: req.body.priceChange.m5,
        h1: req.body.priceChange.h1,
        h6: req.body.priceChange.h6,
        h24: req.body.priceChange.h24,
        pairId: pairCpy._id,
      });

      return priceChange.save();
    })
    .then((changedPrice) => {
      pairCpy.priceChange = changedPrice._id;

      liquidity = new Liquidity({
        usd: req.body.liquidity.usd,
        base: req.body.liquidity.base,
        quote: req.body.liquidity.quote,
        pairId: pairCpy._id,
      });

      return liquidity.save();
    })
    .then((savedLiquidity) => {
      pairCpy.liquidity = savedLiquidity._id;

      volume = new Volume({
        h24: req.body.volume.h24,
        h6: req.body.volume.h6,
        h1: req.body.volume.h1,
        m5: req.body.volume.m5,
        pairId: pairCpy._id,
      });

      return volume.save();
    })
    .then((savedVolume) => {
      pairCpy.volume = savedVolume._id;

      info = new Info({
        imageUrl: req.body.info.imageUrl,
        pairId: pairCpy._id,
      });

      return info.save();
    })
    .then((savedInfo) => {
      pairCpy.info = savedInfo._id;
      infoCpy = savedInfo;

      let tempWebsites = [],
        tempSocials = [];

      req.body.info.websites.forEach((element) => {
        try {
          const { label, url } = element;
          let website = new Website({
            label: label,
            url: url,
            infoId: infoCpy._id,
          });
          website.save();
          tempWebsites.push(website._id);
        } catch (err) {
          throw new Error("Storing Website Links in info Object Failed!");
        }
      });

      req.body.info.socials.forEach((element) => {
        try {
          const { type, url } = element;
          let social = new Social({
            type: type,
            url: url,
            infoId: infoCpy._id,
          });
          social.save();
          tempSocials.push(social._id);
        } catch (err) {
          throw new Error("Storing Socials Links in info Object Failed!");
        }
      });

      infoCpy.websites = tempWebsites;
      infoCpy.socials = tempSocials;

      return infoCpy.save();
    })
    .then((savedInfo) => {
      return pairCpy.save();
    })
    .then((savePair) => {
      return Trading.findById({ _id: trader._id.toString() });
    })
    .then((curTrad) => {
      curTrad.pairs.push(pairCpy._id);
      return curTrad.save();
    })
    .then((savedTrad) => {
      res.status(200).json({
        message: "New Pair Created!",
        data: savedTrad,
      });
    })
    .catch((err) => next(err));
};

exports.deletePair = async (req, res, next) => {
  try {
    const pairId = req.params.pairId;
    const id = new ObjectId(pairId);
    console.log(id);

    const getPair = await Pair.findById({ _id: id });

    await BaseToken.deleteOne({ _id: getPair.baseToken });
    await QuoteToken.deleteOne({ _id: getPair.quoteToken });
    await Liquidity.deleteOne({ _id: getPair.liquidity });
    await Transaction.deleteOne({ _id: getPair.txns });
    await PriceChange.deleteOne({ _id: getPair.priceChange });
    await Price.deleteOne({ _id: getPair.price });
    await Volume.deleteOne({ _id: getPair.volume });

    const getInfo = await Info.findById({ _id: getPair.info });

    getInfo.websites.forEach(async (website) => {
      await Website.deleteOne({ _id: website._id });
    });
    getInfo.socials.forEach(async (social) => {
      await Social.deleteOne({ _id: social._id });
    });
    await Info.deleteOne({ _id: getPair.info });

    Trading.findById({ _id: getPair.tradId })
      .then((tradId) => {
        const index =  tradId.pairs.findIndex(pair => pair.equals(id));
        tradId.pairs.splice(index, 1);
        return tradId.save();
      })
      .then(result=>{
        console.log(result);
      })
      .catch((err) => next(err));


    await Pair.deleteOne({ _id: id });

    res.status(200).json({
      message: "Pair Deleted Successfully :)",
    });
  } catch (err) {
    next(err);
  }


};
