# Activity Diagram - Buying a Reward

## Purpose

This diagram describes how a player buys a reward. The system loads rewards available for the player's level, checks the currency balance and purchase history, saves the purchase, and updates the interface.

```mermaid
flowchart TD
    start(( ))
    open["Player opens the reward shop"]
    fetch["System loads rewards available<br/>for the player's level"]
    choose["Player selects a reward and clicks Buy"]
    currency{"Does the player have<br/>enough currency?"}
    low["Show error:<br/>Not enough currency"]
    bought{"Has the reward<br/>already been bought?"}
    duplicate["Show error:<br/>Reward already purchased"]
    save["Save purchase in player_rewards"]
    subtract["Subtract currency from player"]
    confirm["Show purchase confirmation"]
    stop(( ))

    start --> open --> fetch --> choose --> currency
    currency -- NO --> low
    currency -- YES --> bought
    bought -- YES --> duplicate
    bought -- NO --> save --> subtract --> confirm --> stop

    classDef startEnd fill:#000,stroke:#000,color:#000;
    classDef action fill:#d7e6fb,stroke:#6d95cf,color:#000;
    classDef data fill:#d8ead4,stroke:#7ab266,color:#000;
    classDef decision fill:#fff2cc,stroke:#d6a420,color:#000;
    classDef error fill:#f4cccc,stroke:#cc4f4f,color:#000;

    class start,stop startEnd;
    class open,choose,confirm action;
    class fetch,subtract,save data;
    class currency,bought decision;
    class low,duplicate error;
```
