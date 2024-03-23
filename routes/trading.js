const express = require("express");
const tradeControllers = require("../controllers/trading");

const router = express.Router();

router.post(tradeControllers.trading);

module.exports = router;
