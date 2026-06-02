# Sequence Diagram - Completing a Habit

This diagram shows communication between the player, frontend, backend, and database when a habit is marked as completed. The sequence includes saving a log entry, adding rewards, loading player data, and optionally updating the level.

```mermaid
sequenceDiagram
    actor Player
    participant Frontend as Frontend (React)
    participant Backend as Backend (Express)
    participant DB as Database (SQLite)

    Player->>Frontend: 1. Click Complete habit
    Frontend->>Backend: 2. POST /habits/:id/complete
    Backend->>DB: 3. SELECT * FROM habits WHERE id=:id
    DB-->>Backend: 4. habit data
    Backend->>DB: 5. INSERT INTO habit_logs
    Backend->>DB: 6. UPDATE player SET xp=xp+:xp, currency=currency+:cur
    Backend->>DB: 7. SELECT xp, level FROM player
    DB-->>Backend: 7b. player data
    Backend->>DB: 8. If XP is enough UPDATE player SET level=level+1
    Backend-->>Frontend: 9. 200 OK {xp, level, currency}
    Frontend-->>Player: 10. Update XP bar and player level
```
