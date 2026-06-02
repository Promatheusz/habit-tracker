# Class Diagram - Habit Tracker

This diagram presents the Habit Tracker data structure. It shows players, habits, completion logs, rewards, and purchased rewards with their main fields and relationships.

```mermaid
classDiagram
    direction TB

    class Player {
        +INTEGER id PK
        +TEXT username
        +TEXT password
        +INTEGER xp = 0
        +INTEGER level = 1
        +INTEGER currency = 0
        +TEXT created_at
    }

    class Habit {
        +INTEGER id PK
        +INTEGER player_id FK
        +TEXT name
        +TEXT description
        +TEXT difficulty
        +TEXT frequency
        +TEXT target_days_of_week
        +INTEGER target_days_per_week
        +INTEGER xp_reward = 10
        +INTEGER currency_reward = 5
        +INTEGER is_active = 1
        +TEXT created_at
    }

    class HabitLog {
        +INTEGER id PK
        +INTEGER habit_id FK
        +TEXT completed_at
    }

    class Reward {
        +INTEGER id PK
        +TEXT name
        +TEXT description
        +INTEGER cost = 0
        +INTEGER required_level = 1
        +TEXT image_url
        +TEXT created_at
    }

    class PlayerReward {
        +INTEGER id PK
        +INTEGER player_id FK
        +INTEGER reward_id FK
        +TEXT purchased_at
    }

    Player "1" --> "*" Habit : owns
    Habit "1" --> "*" HabitLog : generates
    Player "1" --> "*" PlayerReward : purchases
    Reward "1" --> "*" PlayerReward : is purchased as
```
