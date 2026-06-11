const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.resolve(__dirname, '../database/database.sqlite');
const schemaPath = path.resolve(__dirname, '../database/schema.sql');
const resetPath = path.resolve(__dirname, '../database/demo-reset.sql');
const dbDir = path.dirname(dbPath);

function execSql(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function closeDb(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function resetDemoDb() {
  fs.mkdirSync(dbDir, { recursive: true });

  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  const resetSql = fs.readFileSync(resetPath, 'utf8');
  const db = new sqlite3.Database(dbPath);

  try {
    await execSql(db, schemaSql);
    await execSql(db, resetSql);
    console.log(`Demo database reset complete: ${dbPath}`);
  } finally {
    await closeDb(db);
  }
}

resetDemoDb().catch((err) => {
  console.error('Demo database reset failed:', err.message);
  process.exitCode = 1;
});
