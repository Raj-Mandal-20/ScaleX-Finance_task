const express = require('express');
const volumeController = require('../controllers/volume');

const router = express.Router();

router.put('/update-volume/:pairId', volumeController.updateVolume);
router.get("/volume", volumeController.fetchVolumes);

module.exports = router;