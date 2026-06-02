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
    Frontend->>Backend: 2. GET /api/rewards
    Backend->>DB: 3. SELECT rewards with purchase state WHERE required_level <= :level
    DB-->>Backend: 4. reward list
    Backend-->>Frontend: 5. 200 OK {rewards[]}
    Frontend-->>Player: 6. Display available rewards

    Player->>Frontend: 7. Click Buy reward
    Frontend->>Backend: 8. POST /api/rewards/:id/buy
    Backend->>DB: 9. SELECT currency FROM players
    DB-->>Backend: 10. currency value
    Backend->>DB: 11. INSERT INTO player_rewards
    Backend->>DB: 12. UPDATE players SET currency=currency-:cost
    Backend-->>Frontend: 13. 200 OK {reward, player}
    Frontend-->>Player: 14. Display purchase confirmation
```
