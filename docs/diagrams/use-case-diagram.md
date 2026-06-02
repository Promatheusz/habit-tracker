# Use Case Diagram - Habit Tracker

This diagram presents the main Habit Tracker use cases. A guest can register an account and log in, while a player can manage habits, earn XP and currency, level up, and buy rewards.

```mermaid
flowchart LR
    guest["Guest"]
    player["Player"]

    subgraph system[Habit Tracker]
        register(("Account registration"))
        login(("Log in to the system"))
        addHabit(("Add habit"))
        browseHabits(("Browse habits"))
        completeHabit(("Mark habit<br/>as completed"))
        earn(("Earn XP<br/>and currency"))
        levelUp(("Level up"))
        deleteHabit(("Delete habit"))
        buyReward(("Buy reward"))
        browseRewards(("Browse reward shop"))
    end

    guest --> register
    guest --> login

    player --> addHabit
    player --> browseHabits
    player --> completeHabit
    player --> deleteHabit
    player --> buyReward
    player --> browseRewards

    completeHabit -. "include" .-> earn
    buyReward -. "include" .-> browseRewards
    earn -. "extend" .-> levelUp

    classDef actor fill:#fff,stroke:#000,color:#000;
    classDef auth fill:#fff2cc,stroke:#d6a420,color:#000;
    classDef usecase fill:#d8ead4,stroke:#7ab266,color:#000;

    class guest,player actor;
    class register,login auth;
    class addHabit,browseHabits,completeHabit,earn,levelUp,deleteHabit,buyReward,browseRewards usecase;
```
