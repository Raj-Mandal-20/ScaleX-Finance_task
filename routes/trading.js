const express = require("express");
const tradeControllers = require("../controllers/trading");

const router = express.Router();

router.post("/create-tradId", tradeControllers.createTradId);

module.exports = router;
