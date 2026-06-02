# RPG Mechanics

This document is the source of truth for XP, level, currency, and reward rules. Implementation details are in `backend/src/utils/levelSystem.js`.

## Difficulty Rewards

Every habit has a difficulty. Difficulty controls both XP and currency rewards.

| Difficulty | XP Reward | Currency Reward |
| --- | ---: | ---: |
| Easy | 10 | 10 |
| Medium | 25 | 25 |
| Hard | 50 | 50 |

## Level Thresholds

Level is calculated from total XP. XP is never spent.

| Level | Total XP Required |
| --- | ---: |
| 1 | 0 |
| 2 | 100 |
| 3 | 250 |
| 4 | 500 |
| 5 | 1000 |
| 6 | 1500 |
| 7 | 2000 |
| 8 | 2500 |
| 9 | 3000 |
| 10 | 3500 |

## Currency Rules

Currency is separate from XP:

* Completing habits increases XP and currency.
* Buying rewards deducts currency only.
* Buying rewards does not reduce total XP.
* Buying rewards does not downgrade player level.

## Duplicate Completion Rule

Each habit can be completed once per calendar day. A second completion attempt on the same day returns an error and grants no XP or currency.

## Examples

### Medium Habit Completion

Starting state:

* XP: 90
* Level: 1
* Currency: 20

Action:

* Complete one medium habit.

Result:

* XP: 115
* Level: 2
* Currency: 45

### Reward Purchase

Starting state:

* XP: 115
* Level: 2
* Currency: 45

Action:

* Buy a reward that costs 25 currency.

Result:

* XP: 115
* Level: 2
* Currency: 20

## Related Diagrams

* [xp-leveling-state.md](diagrams/xp-leveling-state.md)
* [reward-lifecycle-state.md](diagrams/reward-lifecycle-state.md)
* [activity-habit.md](diagrams/activity-habit.md)
* [activity-reward.md](diagrams/activity-reward.md)
