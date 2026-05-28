const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/player/habits', habitController.getHabits);
router.post('/player/habits', habitController.createHabit);
router.post('/habits/:id/complete', habitController.completeHabit);

module.exports = router;
