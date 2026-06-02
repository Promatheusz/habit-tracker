# Database Entity Relationship Model

## Purpose

This ERD describes the SQLite data model used by the backend. It includes authentication, habits, completion logs, rewards, and reward purchase history.

```mermaid
erDiagram
    players ||--o{ habits : owns
    habits ||--o{ habit_logs : generates
    players ||--o{ player_rewards : purchases
    rewards ||--o{ player_rewards : purchased_as

    players {
        integer id PK
        text username UK
        text password
        integer xp
        integer level
        integer currency
        text created_at
    }

    habits {
        integer id PK
        integer player_id FK
        text name
        text description
        text difficulty
        text frequency
        text target_days_of_week
        integer target_days_per_week
        integer xp_reward
        integer currency_reward
        integer is_active
        text created_at
    }

    habit_logs {
        integer id PK
        integer habit_id FK
        text completed_at
    }

    rewards {
        integer id PK
        text name
        text description
        integer cost
        integer required_level
        text image_url
        text created_at
    }

    player_rewards {
        integer id PK
        integer player_id FK
        integer reward_id FK
        text purchased_at
    }
```

## Notes

* `players.username` is unique and is used for login.
* `players.password` stores a hashed password, not the raw password.
* `habits.player_id` links every habit to its owner.
* `habits.is_active` supports soft-delete, so deleted habits can be hidden without removing historical logs.
* `habit_logs` stores completion history and is checked to prevent duplicate same-day completion.
* `player_rewards` has a unique `(player_id, reward_id)` constraint so the same reward cannot be purchased twice.
* Indexes support habit lookup by player, habit-log lookup by habit/date, and purchased-reward lookup by player.
