const { verifyToken } = require('../utils/auth');

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  req.player = {
    id: payload.playerId,
    username: payload.username,
  };

  next();
}

module.exports = {
  authenticate,
};
