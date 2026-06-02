# State Machine Diagram - Habit Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Active: create habit
    Active --> CompletedToday: complete habit
    CompletedToday --> Active: next calendar day
    Active --> Edited: update habit
    Edited --> Active: save changes
    Active --> Inactive: delete habit
    Edited --> Inactive: delete habit
    Inactive --> [*]
```
