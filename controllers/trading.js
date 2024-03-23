const Trading = require("../model/trading");

exports.trading = (req, res, next) => {
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
