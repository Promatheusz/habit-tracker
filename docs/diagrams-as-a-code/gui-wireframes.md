# GUI Wireframes

## Purpose

These Mermaid wireframes document the main screens of the Habit Tracker RPG interface. They describe layout structure rather than final visual styling.

## Authentication Screen

```mermaid
flowchart TB
    page["Full-screen auth page"]
    title["Habit Tracker RPG title"]
    mode["Login/Register mode text"]
    username["Username input"]
    password["Password input"]
    submit["Primary submit button"]
    switchMode["Switch login/register button"]
    error["Error message area"]

    page --> title
    title --> mode
    mode --> error
    error --> username
    username --> password
    password --> submit
    submit --> switchMode
```

## Dashboard Screen

```mermaid
flowchart TB
    shell["App shell"]
    sidebar["Sidebar navigation"]
    topbar["Top bar with logout"]
    heading["Welcome heading"]
    xp["Experience progress card"]
    stats["Currency / level / remaining XP cards"]
    today["Today's habits list"]
    history["Recent completions"]

    shell --> sidebar
    shell --> topbar
    topbar --> heading
    heading --> xp
    xp --> stats
    stats --> today
    today --> history
```

## Habit Management Screen

```mermaid
flowchart TB
    shell["App shell"]
    heading["Habits heading"]
    message["Success/error message area"]
    form["Habit form"]
    fields["Name, description, difficulty, frequency"]
    weekly["Weekly target fields when frequency is weekly"]
    list["Active habit list"]
    actions["Complete / Edit / Delete buttons"]

    shell --> heading
    heading --> message
    message --> form
    form --> fields
    fields --> weekly
    form --> list
    list --> actions
```

## Reward Shop Screen

```mermaid
flowchart TB
    shell["App shell"]
    heading["Reward Shop heading"]
    balance["Currency balance"]
    rewards["Reward cards grid"]
    card["Reward name, description, cost, required level"]
    buy["Buy/Purchased button"]

    shell --> heading
    heading --> balance
    balance --> rewards
    rewards --> card
    card --> buy
```

## Profile Screen

```mermaid
flowchart TB
    shell["App shell"]
    heading["Profile heading"]
    summary["Player summary card"]
    xp["XP progress bar"]
    metrics["Total XP / currency / level metrics"]
    purchased["Purchased rewards list"]

    shell --> heading
    heading --> summary
    summary --> xp
    xp --> metrics
    metrics --> purchased
```
