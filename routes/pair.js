const express = require("express");
const pairController = require('../controllers/pair');
const router = express.Router();


router.delete('/delete-pair/:pairId', pairController.deletePair);
router.post('/create-pair', pairController.postTrading);


module.exports = router;
