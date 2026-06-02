const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/player', authenticate, playerController.getPlayer);
router.get('/rewards', authenticate, playerController.getRewards);
router.get('/rewards/purchased', authenticate, playerController.getPurchasedRewards);
router.post('/rewards/:id/buy', authenticate, playerController.purchaseReward);

module.exports = router;
