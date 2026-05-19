-- =============================================================
--  Habit Tracker – schemat bazy danych SQLite
-- =============================================================

PRAGMA foreign_keys = ON;

-- -------------------------------------------------------------
-- GRACZE
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS players (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    username     TEXT    NOT NULL UNIQUE,
    password     TEXT    NOT NULL,              -- zahashowane hasło
    xp           INTEGER NOT NULL DEFAULT 0,
    level        INTEGER NOT NULL DEFAULT 1,
    currency     INTEGER NOT NULL DEFAULT 0,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- -------------------------------------------------------------
-- NAWYKI
-- frequency: 'daily' | 'weekly' | 'one-time'
--
-- Dla 'daily':
--   target_days_of_week = NULL
--   target_days_per_week = NULL
--
-- Dla 'weekly':
--   target_days_of_week = np. '1,3,5' (pon, śr, pt) — opcjonalne
--   target_days_per_week = np. 3 (3x w tygodniu)    — opcjonalne
--   (przynajmniej jedno z nich powinno być ustawione)
--
-- Dla 'one-time':
--   target_days_of_week = NULL
--   target_days_per_week = NULL
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS habits (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id            INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    name                 TEXT    NOT NULL,
    description          TEXT,
    frequency            TEXT    NOT NULL DEFAULT 'daily'
                         CHECK (frequency IN ('daily', 'weekly', 'one-time')),
    target_days_of_week  TEXT,   -- np. '1,3,5' = pon, śr, pt (dla weekly)
    target_days_per_week INTEGER,-- np. 3 = 3x w tygodniu (dla weekly)
    xp_reward            INTEGER NOT NULL DEFAULT 10,
    currency_reward      INTEGER NOT NULL DEFAULT 5,
    is_active            INTEGER NOT NULL DEFAULT 1,  -- 0 = usunięty
    created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- -------------------------------------------------------------
-- HISTORIA WYKONANIA NAWYKÓW
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS habit_logs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id     INTEGER NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    completed_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- -------------------------------------------------------------
-- NAGRODY W SKLEPIE
-- Gracz kupuje za currency.
-- required_level określa minimalny poziom gracza żeby nagroda
-- była widoczna/dostępna w sklepie.
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rewards (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT    NOT NULL,
    description    TEXT,
    cost           INTEGER NOT NULL DEFAULT 0,
    required_level INTEGER NOT NULL DEFAULT 1,
    image_url      TEXT,
    created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- -------------------------------------------------------------
-- NAGRODY KUPIONE PRZEZ GRACZA
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS player_rewards (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id    INTEGER NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    reward_id    INTEGER NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
    purchased_at TEXT    NOT NULL DEFAULT (datetime('now')),
    UNIQUE (player_id, reward_id)  -- gracz nie kupi tej samej nagrody dwa razy
);

-- -------------------------------------------------------------
-- INDEKSY (wydajność zapytań)
-- -------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_habits_player_id
    ON habits(player_id);

CREATE INDEX IF NOT EXISTS idx_habit_logs_habit_id
    ON habit_logs(habit_id);

CREATE INDEX IF NOT EXISTS idx_habit_logs_completed_at
    ON habit_logs(completed_at);

CREATE INDEX IF NOT EXISTS idx_player_rewards_player_id
    ON player_rewards(player_id);