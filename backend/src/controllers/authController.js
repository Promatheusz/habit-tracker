const db = require('../config/db');
const { createToken, hashPassword, verifyPassword } = require('../utils/auth');
const { formatPlayer } = require('./playerController');

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

async function register(req, res) {
  const username = String(req.body.username || '').trim();
  const { password } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Password must contain at least 6 characters' });
  }

  try {
    const result = await db.run(
      'INSERT INTO players (username, password, xp, level, currency) VALUES (?, ?, 0, 1, 0)',
      [username, hashPassword(password)],
    );
    const player = await db.get(
      'SELECT id, username, xp, level, currency, created_at FROM players WHERE id = ?',
      [result.lastID],
    );

    res.status(201).json({
      token: createToken(player),
      player: formatPlayer(player),
    });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Username is already taken' });
    }
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  const username = String(req.body.username || '').trim();
  const { password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const player = await db.get('SELECT * FROM players WHERE username = ?', [username]);
    if (!player || !verifyPassword(password, player.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({
      token: createToken(player),
      player: formatPlayer(player),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function me(req, res) {
  try {
    const player = await db.get(
      'SELECT id, username, xp, level, currency, created_at FROM players WHERE id = ?',
      [req.player.id],
    );
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(formatPlayer(player));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  login,
  me,
  register,
};
