const express = require('express');
const priceController = require('../controllers/price');
const router = express.Router();

router.put('/update-price/:pairId', priceController.updatePrice);
router.get('/price', priceController.fetchPrices);

module.exports = router;
