const db = require('../config/db');
const { calculateLevelAndXP, getXPForNextLevel } = require('../utils/levelSystem');

/**
 * Pobiera listę aktywnych nawyków.
 */
async function getHabits(req, res) {
  try {
    const habits = await db.all('SELECT * FROM habits WHERE player_id = 1 AND is_active = 1');
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Dodaje nowy nawyk.
 */
async function createHabit(req, res) {
  const { name, description, frequency, xp_reward, currency_reward } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Nazwa jest wymagana' });
  }
  try {
    const result = await db.run(
      `INSERT INTO habits (player_id, name, description, frequency, xp_reward, currency_reward)
       VALUES (1, ?, ?, ?, ?, ?)`,
      [name, description || null, frequency || 'daily', xp_reward || 10, currency_reward || 5],
    );
    const newHabit = await db.get('SELECT * FROM habits WHERE id = ?', [result.lastID]);
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Oznacza nawyk jako wykonany.
 */
async function completeHabit(req, res) {
  try {
    const habit = await db.get('SELECT * FROM habits WHERE id = ? AND is_active = 1', [
      req.params.id,
    ]);
    if (!habit) {
      return res.status(404).json({ error: 'Nawyk nie istnieje lub jest nieaktywny' });
    }

    const player = await db.get('SELECT * FROM players WHERE id = 1');
    await db.run('INSERT INTO habit_logs (habit_id) VALUES (?)', [habit.id]);

    const updatedStats = calculateLevelAndXP(player.level, player.xp, habit.xp_reward);
    const newCurrency = player.currency + habit.currency_reward;

    await db.run('UPDATE players SET level = ?, xp = ?, currency = ? WHERE id = 1', [
      updatedStats.level,
      updatedStats.xp,
      newCurrency,
    ]);

    res.json({
      message: 'Zadanie zaliczone!',
      player: {
        username: player.username,
        level: updatedStats.level,
        xp: updatedStats.xp,
        maxXP: getXPForNextLevel(updatedStats.level),
        currency: newCurrency,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getHabits,
  createHabit,
  completeHabit,
};
