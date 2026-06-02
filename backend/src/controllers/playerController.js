const db = require('../config/db');
const { getXPForLevel, getXPForNextLevel } = require('../utils/levelSystem');

function formatPlayer(player) {
  const maxXP = getXPForNextLevel(player.level);
  const currentLevelXP = getXPForLevel(player.level);

  return {
    id: player.id,
    username: player.username,
    level: player.level,
    xp: player.xp,
    currentLevelXP,
    maxXP,
    xpInLevel: Math.max(0, player.xp - currentLevelXP),
    xpToNextLevel: Math.max(0, maxXP - player.xp),
    currency: player.currency,
    created_at: player.created_at,
  };
}

/**
 * Pobiera dane profilu aktywnego gracza.
 */
async function getPlayer(req, res) {
  try {
    const player = await db.get(
      'SELECT id, username, xp, level, currency, created_at FROM players WHERE id = ?',
      [req.player.id],
    );
    if (!player) {
      return res.status(404).json({ error: 'Nie znaleziono gracza' });
    }
    res.json(formatPlayer(player));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Pobiera listę nagród dostępnych dla poziomu aktywnego gracza.
 */
async function getRewards(req, res) {
  try {
    const player = await db.get('SELECT level FROM players WHERE id = ?', [req.player.id]);
    const rewards = await db.all(
      `SELECT rewards.*,
              CASE WHEN player_rewards.id IS NULL THEN 0 ELSE 1 END AS purchased
       FROM rewards
       LEFT JOIN player_rewards
         ON player_rewards.reward_id = rewards.id
        AND player_rewards.player_id = ?
       WHERE rewards.required_level <= ?
       ORDER BY rewards.required_level, rewards.cost`,
      [req.player.id, player.level],
    );
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPurchasedRewards(req, res) {
  try {
    const rewards = await db.all(
      `SELECT rewards.*, player_rewards.purchased_at
       FROM player_rewards
       JOIN rewards ON rewards.id = player_rewards.reward_id
       WHERE player_rewards.player_id = ?
       ORDER BY player_rewards.purchased_at DESC`,
      [req.player.id],
    );
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Realizuje zakup nagrody przez gracza.
 */
async function purchaseReward(req, res) {
  const reward_id = req.params.id || req.body.reward_id;
  if (!reward_id) {
    return res.status(400).json({ error: 'ID nagrody jest wymagane' });
  }
  try {
    const player = await db.get('SELECT * FROM players WHERE id = ?', [req.player.id]);
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

    await db.run('INSERT INTO player_rewards (player_id, reward_id) VALUES (?, ?)', [
      req.player.id,
      reward.id,
    ]);
    const newCurrency = player.currency - reward.cost;
    await db.run('UPDATE players SET currency = ? WHERE id = ?', [newCurrency, req.player.id]);

    res.json({
      message: 'Zakupiono nagrodę!',
      reward,
      player: formatPlayer({ ...player, currency: newCurrency }),
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Nagroda została już zakupiona' });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  formatPlayer,
  getPlayer,
  getPurchasedRewards,
  getRewards,
  purchaseReward,
};
