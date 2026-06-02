# Sequence Diagram - Completing a Habit

## Purpose

This diagram shows communication between the player, frontend, backend, and database when a habit is marked as completed. The sequence includes saving a log entry, adding rewards, loading player data, and optionally updating the level.

```mermaid
sequenceDiagram
    actor Player
    participant Frontend as Frontend (React)
    participant Backend as Backend (Express)
    participant DB as Database (SQLite)

    Player->>Frontend: 1. Click Complete habit
    Frontend->>Backend: 2. POST /api/habits/:id/complete
    Backend->>DB: 3. SELECT * FROM habits WHERE id=:id
    DB-->>Backend: 4. habit data
    Backend->>DB: 5. Check no same-day habit_logs entry exists
    Backend->>DB: 6. INSERT INTO habit_logs
    Backend->>DB: 7. UPDATE player SET xp=xp+:xp, currency=currency+:cur
    Backend->>DB: 8. SELECT xp, level FROM player
    DB-->>Backend: 8b. player data
    Backend->>DB: 9. If XP is enough UPDATE player SET level=:level
    Backend-->>Frontend: 10. 200 OK {xp, level, currency}
    Frontend-->>Player: 11. Update XP bar and player level
```
