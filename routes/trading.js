const express = require("express");
const tradeControllers = require('../controllers/trading');

const router = express.Router();

router.post('/create-tradId', tradeControllers.createTradId);
router.post("/trading", tradeControllers.postTrading);

module.exports = router;
