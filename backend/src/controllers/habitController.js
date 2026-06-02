const db = require('../config/db');
const {
  calculateLevelAndXP,
  getXPRewardForDifficulty,
} = require('../utils/levelSystem');
const { formatPlayer } = require('./playerController');

const VALID_FREQUENCIES = ['daily', 'weekly', 'one-time'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

function normalizeHabitInput(body) {
  const difficulty = body.difficulty || 'easy';
  const frequency = body.frequency || 'daily';
  const xpReward = getXPRewardForDifficulty(difficulty);

  return {
    name: String(body.name || '').trim(),
    description: body.description ? String(body.description).trim() : null,
    difficulty,
    frequency,
    target_days_of_week: body.target_days_of_week || null,
    target_days_per_week: body.target_days_per_week || null,
    xp_reward: xpReward,
    currency_reward: xpReward,
  };
}

function validateHabitInput(input) {
  if (!input.name) {
    return 'Nazwa jest wymagana';
  }
  if (!VALID_DIFFICULTIES.includes(input.difficulty)) {
    return 'Nieprawidłowa trudność nawyku';
  }
  if (!VALID_FREQUENCIES.includes(input.frequency)) {
    return 'Nieprawidłowa częstotliwość nawyku';
  }
  if (input.frequency === 'weekly' && !input.target_days_of_week && !input.target_days_per_week) {
    return 'Nawyk tygodniowy wymaga dni tygodnia lub liczby dni w tygodniu';
  }
  return null;
}

/**
 * Pobiera listę aktywnych nawyków.
 */
async function getHabits(req, res) {
  try {
    const habits = await db.all(
      `SELECT habits.*,
              CASE WHEN today_logs.id IS NULL THEN 0 ELSE 1 END AS completed_today
       FROM habits
       LEFT JOIN habit_logs AS today_logs
         ON today_logs.habit_id = habits.id
        AND date(today_logs.completed_at) = date('now')
       WHERE habits.player_id = ? AND habits.is_active = 1
       ORDER BY habits.created_at DESC`,
      [req.player.id],
    );
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Dodaje nowy nawyk.
 */
async function createHabit(req, res) {
  const input = normalizeHabitInput(req.body);
  const validationError = validateHabitInput(input);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  try {
    const result = await db.run(
      `INSERT INTO habits (
        player_id, name, description, difficulty, frequency, target_days_of_week,
        target_days_per_week, xp_reward, currency_reward
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.player.id,
        input.name,
        input.description,
        input.difficulty,
        input.frequency,
        input.target_days_of_week,
        input.target_days_per_week,
        input.xp_reward,
        input.currency_reward,
      ],
    );
    const newHabit = await db.get('SELECT * FROM habits WHERE id = ?', [result.lastID]);
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateHabit(req, res) {
  const input = normalizeHabitInput(req.body);
  const validationError = validateHabitInput(input);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const habit = await db.get(
      'SELECT * FROM habits WHERE id = ? AND player_id = ? AND is_active = 1',
      [req.params.id, req.player.id],
    );
    if (!habit) {
      return res.status(404).json({ error: 'Nawyk nie istnieje lub jest nieaktywny' });
    }

    await db.run(
      `UPDATE habits
       SET name = ?, description = ?, difficulty = ?, frequency = ?, target_days_of_week = ?,
           target_days_per_week = ?, xp_reward = ?, currency_reward = ?
       WHERE id = ? AND player_id = ?`,
      [
        input.name,
        input.description,
        input.difficulty,
        input.frequency,
        input.target_days_of_week,
        input.target_days_per_week,
        input.xp_reward,
        input.currency_reward,
        req.params.id,
        req.player.id,
      ],
    );

    const updatedHabit = await db.get('SELECT * FROM habits WHERE id = ?', [req.params.id]);
    res.json(updatedHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteHabit(req, res) {
  try {
    const result = await db.run(
      'UPDATE habits SET is_active = 0 WHERE id = ? AND player_id = ? AND is_active = 1',
      [req.params.id, req.player.id],
    );
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Nawyk nie istnieje lub jest nieaktywny' });
    }
    res.json({ message: 'Nawyk usunięty' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Oznacza nawyk jako wykonany.
 */
async function completeHabit(req, res) {
  try {
    const habit = await db.get(
      'SELECT * FROM habits WHERE id = ? AND player_id = ? AND is_active = 1',
      [req.params.id, req.player.id],
    );
    if (!habit) {
      return res.status(404).json({ error: 'Nawyk nie istnieje lub jest nieaktywny' });
    }

    const existingLog = await db.get(
      `SELECT id FROM habit_logs
       WHERE habit_id = ? AND date(completed_at) = date('now')`,
      [habit.id],
    );
    if (existingLog) {
      return res.status(409).json({ error: 'Nawyk został już wykonany dzisiaj' });
    }

    const player = await db.get('SELECT * FROM players WHERE id = ?', [req.player.id]);
    await db.run('INSERT INTO habit_logs (habit_id) VALUES (?)', [habit.id]);

    const updatedStats = calculateLevelAndXP(player.xp, habit.xp_reward);
    const newCurrency = player.currency + habit.currency_reward;

    await db.run('UPDATE players SET level = ?, xp = ?, currency = ? WHERE id = ?', [
      updatedStats.level,
      updatedStats.xp,
      newCurrency,
      req.player.id,
    ]);

    res.json({
      message: 'Zadanie zaliczone!',
      habit: { ...habit, completed_today: 1 },
      player: formatPlayer({
        ...player,
        level: updatedStats.level,
        xp: updatedStats.xp,
        currency: newCurrency,
      }),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getHabitLogs(req, res) {
  try {
    const logs = await db.all(
      `SELECT habit_logs.*, habits.name AS habit_name
       FROM habit_logs
       JOIN habits ON habits.id = habit_logs.habit_id
       WHERE habits.player_id = ?
       ORDER BY habit_logs.completed_at DESC
       LIMIT 50`,
      [req.player.id],
    );
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  deleteHabit,
  getHabitLogs,
  getHabits,
  createHabit,
  completeHabit,
  updateHabit,
};
