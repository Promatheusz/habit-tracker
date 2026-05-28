const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/player', playerController.getPlayer);
router.get('/rewards', playerController.getRewards);
router.post('/player/purchase', playerController.purchaseReward);

module.exports = router;
