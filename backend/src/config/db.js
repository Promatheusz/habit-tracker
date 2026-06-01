const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../database/database.sqlite');
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

async function seedData() {
  const count = await dbQuery.get('SELECT COUNT(*) as total FROM players');
  if (count.total === 0) {
    await dbQuery.run(
      `INSERT INTO players (id, username, password, xp, level, currency)
       VALUES (1, 'PlaceholderUser', 'placeholder_hash', 195, 2, 20)`,
    );
    await dbQuery.run(
      `INSERT INTO habits (player_id, name, description, frequency, xp_reward, currency_reward)
       VALUES 
       (1, 'Workout', 'Daily physical exercise', 'daily', 20, 5),
       (1, 'Read 20 Pages', 'Read a non-fiction book', 'daily', 15, 5),
       (1, 'Study React', 'Learn hooks and routing', 'daily', 25, 10)`,
    );
    await dbQuery.run(
      `INSERT INTO rewards (name, description, cost, required_level)
       VALUES 
       ('Play Console Games (1h)', 'Relaxing gameplay', 15, 1),
       ('Watch a Movie', 'Evening cinema', 25, 1)`,
    );
    console.log('Zasilono bazę danych danymi startowymi.');
  }
}

module.exports = {
  db,
  initDb,
  ...dbQuery,
};
