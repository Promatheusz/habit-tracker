# Activity Diagram - Completing a Habit

## Purpose

This diagram shows the process of marking a habit as completed. It includes selecting a habit, checking whether it has already been completed today, saving a log entry, granting XP and currency, and updating the player's level when needed.

```mermaid
flowchart TD
    start(("Start"))
    openList["Player opens the habit list"]
    chooseHabit["Player selects a habit to complete"]
    completeClick["Player clicks Complete habit"]
    alreadyDone{"Has the habit already been completed today?"}
    duplicateError["Show error: Habit already completed"]
    saveLog["Save entry in habit_logs"]
    addReward["Add XP and currency to player"]
    checkLevel{"Does the player level up?"}
    increaseLevel["Increase player level"]
    updateUi["Update UI: XP bar and level"]
    stop(("End"))

    start --> openList --> chooseHabit --> completeClick --> alreadyDone
    alreadyDone -- YES --> duplicateError
    alreadyDone -- NO --> saveLog --> addReward --> checkLevel
    checkLevel -- YES --> increaseLevel --> updateUi
    checkLevel -- NO --> updateUi
    updateUi --> stop

    classDef startEnd fill:#000,stroke:#000,color:#000;
    classDef action fill:#d7e6fb,stroke:#6d95cf,color:#000;
    classDef data fill:#d8ead4,stroke:#7ab266,color:#000;
    classDef decision fill:#fff2cc,stroke:#d6a420,color:#000;
    classDef error fill:#f4cccc,stroke:#cc4f4f,color:#000;

    class start,stop startEnd;
    class openList,chooseHabit,completeClick,updateUi action;
    class saveLog,addReward,increaseLevel data;
    class alreadyDone,checkLevel decision;
    class duplicateError error;
```
