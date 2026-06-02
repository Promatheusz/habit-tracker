const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/habits', authenticate, habitController.getHabits);
router.post('/habits', authenticate, habitController.createHabit);
router.put('/habits/:id', authenticate, habitController.updateHabit);
router.delete('/habits/:id', authenticate, habitController.deleteHabit);
router.post('/habits/:id/complete', authenticate, habitController.completeHabit);
router.get('/habit-logs', authenticate, habitController.getHabitLogs);

router.get('/player/habits', authenticate, habitController.getHabits);
router.post('/player/habits', authenticate, habitController.createHabit);

module.exports = router;
