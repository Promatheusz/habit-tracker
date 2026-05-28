const db = require('../config/db');
const { getXPForNextLevel } = require('../utils/levelSystem');

/**
 * Pobiera dane profilu gracza o ID 1.
 */
async function getPlayer(req, res) {
  try {
    const player = await db.get(
      'SELECT id, username, xp, level, currency, created_at FROM players WHERE id = 1',
    );
    if (!player) {
      return res.status(404).json({ error: 'Nie znaleziono gracza' });
    }
    res.json({
      username: player.username,
      level: player.level,
      xp: player.xp,
      maxXP: getXPForNextLevel(player.level),
      currency: player.currency,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Pobiera listę wszystkich nagród w sklepie.
 */
async function getRewards(req, res) {
  try {
    const rewards = await db.all('SELECT * FROM rewards');
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Realizuje zakup nagrody przez gracza.
 */
async function purchaseReward(req, res) {
  const { reward_id } = req.body;
  if (!reward_id) {
    return res.status(400).json({ error: 'ID nagrody jest wymagane' });
  }
  try {
    const player = await db.get('SELECT * FROM players WHERE id = 1');
    const reward = await db.get('SELECT * FROM rewards WHERE id = ?', [reward_id]);

    if (!reward) {
      return res.status(404).json({ error: 'Nagroda nie istnieje' });
    }
    if (player.level < reward.required_level) {
      return res.status(403).json({ error: 'Wymagany wyższy poziom' });
    }
    if (player.currency < reward.cost) {
      return res.status(400).json({ error: 'Niewystarczająca ilość waluty' });
    }

    await db.run('INSERT INTO player_rewards (player_id, reward_id) VALUES (1, ?)', [reward.id]);
    const newCurrency = player.currency - reward.cost;
    await db.run('UPDATE players SET currency = ? WHERE id = 1', [newCurrency]);

    res.json({
      message: 'Zakupiono nagrodę!',
      player: {
        username: player.username,
        level: player.level,
        xp: player.xp,
        maxXP: getXPForNextLevel(player.level),
        currency: newCurrency,
      },
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Nagroda została już zakupiona' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getPlayer,
  getRewards,
  purchaseReward,
};
