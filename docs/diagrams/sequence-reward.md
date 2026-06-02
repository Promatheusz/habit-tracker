# Sequence Diagram - Buying a Reward

## Purpose

This diagram describes message flow while browsing the reward shop and buying a reward. The backend loads rewards available for the player's level, checks currency, subtracts the cost, and saves the purchase in the database.

```mermaid
sequenceDiagram
    actor Player
    participant Frontend as Frontend (React)
    participant Backend as Backend (Express)
    participant DB as Database (SQLite)

    Player->>Frontend: 1. Open reward shop
    Frontend->>Backend: 2. GET /rewards
    Backend->>DB: 3. SELECT * FROM rewards WHERE required_level <= :level
    DB-->>Backend: 4. reward list
    Backend-->>Frontend: 5. 200 OK {rewards[]}
    Frontend-->>Player: 6. Display available rewards

    Player->>Frontend: 7. Click Buy reward
    Frontend->>Backend: 8. POST /api/rewards/:id/buy
    Backend->>DB: 9. SELECT currency FROM player
    DB-->>Backend: 10. currency value
    Backend->>DB: 11. If currency is enough UPDATE player SET currency=currency-:cost
    Backend->>DB: 12. INSERT INTO player_rewards
    Backend-->>Frontend: 13. 200 OK {success, new_currency}
    Frontend-->>Player: 14. Display purchase confirmation
```
