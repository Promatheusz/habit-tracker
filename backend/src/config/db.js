const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { hashPassword } = require('../utils/auth');
const { getLevelForXP, getXPRewardForDifficulty } = require('../utils/levelSystem');

const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.resolve(__dirname, '../../database/database.sqlite');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Błąd połączenia z bazą SQLite:', err.message);
  } else {
    console.log('Połączono z bazą danych SQLite:', dbPath);
  }
});

function initDb() {
  return new Promise((resolve, reject) => {
    const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
    fs.readFile(schemaPath, 'utf8', (err, sql) => {
      if (err) {
        return reject(err);
      }
      db.exec(sql, async (err) => {
        if (err) {
          return reject(err);
        }
        try {
          await migrateDb();
          await seedData();
          resolve();
        } catch (seedErr) {
          reject(seedErr);
        }
      });
    });
  });
}

const dbQuery = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};

function closeDb() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function columnExists(table, column) {
  const columns = await dbQuery.all(`PRAGMA table_info(${table})`);
  return columns.some((entry) => entry.name === column);
}

async function migrateDb() {
  if (!(await columnExists('habits', 'difficulty'))) {
    await dbQuery.run(
      "ALTER TABLE habits ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard'))",
    );
  }

  const habits = await dbQuery.all('SELECT id, difficulty FROM habits');
  await Promise.all(
    habits.map((habit) =>
      dbQuery.run('UPDATE habits SET xp_reward = ?, currency_reward = ? WHERE id = ?', [
        getXPRewardForDifficulty(habit.difficulty),
        getXPRewardForDifficulty(habit.difficulty),
        habit.id,
      ]),
    ),
  );

  const players = await dbQuery.all('SELECT id, xp FROM players');
  await Promise.all(
    players.map((player) =>
      dbQuery.run('UPDATE players SET level = ? WHERE id = ?', [
        getLevelForXP(player.xp || 0),
        player.id,
      ]),
    ),
  );
}

async function seedData() {
  const placeholder = await dbQuery.get('SELECT id FROM players WHERE username = ?', [
    'PlaceholderUser',
  ]);
  if (placeholder) {
    await dbQuery.run('UPDATE players SET username = ?, password = ? WHERE id = ?', [
      'demo',
      hashPassword('password'),
      placeholder.id,
    ]);
  }

  const demoUser = await dbQuery.get('SELECT id FROM players WHERE username = ?', ['demo']);
  if (!demoUser) {
    await dbQuery.run(
      `INSERT INTO players (id, username, password, xp, level, currency)
       VALUES (1, 'demo', ?, 250, 3, 120)
       ON CONFLICT(id) DO NOTHING`,
      [hashPassword('password')],
    );
  }

  const count = await dbQuery.get('SELECT COUNT(*) as total FROM habits');
  if (count.total === 0) {
    await dbQuery.run(
      `INSERT INTO habits (player_id, name, description, difficulty, frequency, xp_reward, currency_reward)
       VALUES 
       (1, 'Workout', 'Daily physical exercise', 'medium', 'daily', 25, 25),
       (1, 'Read 20 Pages', 'Read a non-fiction book', 'easy', 'daily', 10, 10),
       (1, 'Study React', 'Learn hooks and routing', 'medium', 'weekly', 25, 25)`,
    );
  }

  const rewardCount = await dbQuery.get('SELECT COUNT(*) as total FROM rewards');
  if (rewardCount.total === 0) {
    await dbQuery.run(
      `INSERT INTO rewards (name, description, cost, required_level)
       VALUES 
       ('Coffee Break', 'A focused reset after a productive session', 25, 1),
       ('Play Console Games (1h)', 'Relaxing gameplay', 50, 2),
       ('Watch a Movie', 'Evening cinema', 80, 3),
       ('Custom Profile Icon', 'Unlock a visual profile bonus', 120, 4)`,
    );
  }

  console.log('Zasilono bazę danych danymi startowymi.');
}

module.exports = {
  db,
  closeDb,
  initDb,
  ...dbQuery,
};
