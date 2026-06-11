-- =============================================================
--  Habit Tracker - reset danych demonstracyjnych SQLite
-- =============================================================
-- Uruchamiaj jawnie przez `npm run db:demo-reset`.
-- Skrypt usuwa poprzednie dane aplikacji i tworzy jedno konto demo.

PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

DELETE FROM player_rewards;
DELETE FROM habit_logs;
DELETE FROM habits;
DELETE FROM rewards;
DELETE FROM players;

DELETE FROM sqlite_sequence
WHERE name IN ('players', 'habits', 'habit_logs', 'rewards', 'player_rewards');

INSERT INTO players (id, username, password, xp, level, currency, created_at)
VALUES (
    1,
    'demo',
    'd9f25308d77a0904f76c2182bc98a615:ac62907a1bed6ed07a089e3780e2f015601d83c944dbad280c116ecb78c5343f3c022d24a4e5bda37ca4e56ba3629c7c0eba247cd8c886cb76fe7071ca95d778',
    520,
    4,
    185,
    datetime('now', '-21 days')
);

INSERT INTO habits (
    id, player_id, name, description, difficulty, frequency,
    target_days_of_week, target_days_per_week, xp_reward,
    currency_reward, is_active, created_at
)
VALUES
    (1, 1, 'Morning Hydration', 'Drink water before opening the laptop.', 'easy', 'daily', NULL, NULL, 10, 10, 1, datetime('now', '-14 days')),
    (2, 1, 'Deep Work Sprint', 'Finish one focused block without distractions.', 'medium', 'daily', NULL, NULL, 25, 25, 1, datetime('now', '-13 days')),
    (3, 1, 'Evening Workout', 'Complete strength or cardio training.', 'hard', 'daily', NULL, NULL, 50, 50, 1, datetime('now', '-12 days')),
    (4, 1, 'Study React Hooks', 'Practice hooks, routing, and API state.', 'medium', 'weekly', '1,3,5', 3, 25, 25, 1, datetime('now', '-11 days')),
    (5, 1, 'Meal Prep Planning', 'Plan two healthy meals for the week.', 'easy', 'weekly', NULL, 2, 10, 10, 1, datetime('now', '-10 days')),
    (6, 1, 'Finish Portfolio Section', 'Ship one visible portfolio improvement.', 'hard', 'one-time', NULL, NULL, 50, 50, 1, datetime('now', '-9 days')),
    (7, 1, 'Sleep Before Midnight', 'End the day early enough to recover.', 'medium', 'daily', NULL, NULL, 25, 25, 1, datetime('now', '-8 days'));

INSERT INTO habit_logs (id, habit_id, completed_at)
VALUES
    (1, 1, datetime('now', '-8 hours')),
    (2, 2, datetime('now', '-5 hours')),
    (3, 5, datetime('now', '-2 hours')),
    (4, 4, datetime('now', '-1 day', '+18 hours')),
    (5, 3, datetime('now', '-1 day', '+20 hours')),
    (6, 1, datetime('now', '-2 days', '+8 hours')),
    (7, 2, datetime('now', '-2 days', '+11 hours')),
    (8, 7, datetime('now', '-2 days', '+21 hours')),
    (9, 4, datetime('now', '-3 days', '+17 hours')),
    (10, 3, datetime('now', '-3 days', '+19 hours')),
    (11, 1, datetime('now', '-4 days', '+8 hours')),
    (12, 2, datetime('now', '-4 days', '+10 hours')),
    (13, 6, datetime('now', '-5 days', '+16 hours')),
    (14, 7, datetime('now', '-6 days', '+22 hours')),
    (15, 1, datetime('now', '-7 days', '+8 hours'));

INSERT INTO rewards (id, name, description, cost, required_level, image_url, created_at)
VALUES
    (1, 'Power Nap Pass', 'A guilt-free 20 minute reset after a strong streak.', 20, 1, NULL, datetime('now', '-14 days')),
    (2, 'Specialty Coffee', 'Upgrade the next study session with a favorite drink.', 45, 1, NULL, datetime('now', '-13 days')),
    (3, 'Indie Game Hour', 'Spend one earned hour on a cozy or strategic game.', 80, 2, NULL, datetime('now', '-12 days')),
    (4, 'Movie Night', 'Reserve an evening movie after finishing the week strong.', 120, 3, NULL, datetime('now', '-11 days')),
    (5, 'Custom Profile Icon', 'Unlock a visual profile bonus.', 120, 4, NULL, datetime('now', '-10 days')),
    (6, 'New Desk Accessory', 'Buy a small workspace upgrade for better focus.', 220, 4, NULL, datetime('now', '-9 days')),
    (7, 'Weekend Quest Day', 'Plan a larger weekend activity as a milestone reward.', 320, 4, NULL, datetime('now', '-8 days')),
    (8, 'Custom Avatar Frame', 'A higher-level cosmetic unlock for the profile.', 450, 5, NULL, datetime('now', '-7 days'));

INSERT INTO player_rewards (id, player_id, reward_id, purchased_at)
VALUES
    (1, 1, 1, datetime('now', '-6 days', '+19 hours')),
    (2, 1, 3, datetime('now', '-3 days', '+20 hours')),
    (3, 1, 4, datetime('now', '-1 day', '+21 hours'));

COMMIT;
