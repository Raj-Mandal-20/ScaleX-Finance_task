const express = require("express");
const tradeControllers = require('../controllers/trading');
const router = express.Router();


router.delete('/delete-pair/:pairId', tradeControllers.deletePair);
router.post('/trading', tradeControllers.postTrading);

module.exports = router;
