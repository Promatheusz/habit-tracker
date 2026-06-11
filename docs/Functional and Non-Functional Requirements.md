# Functional And Non-Functional Requirements

This document defines the required behavior, quality expectations, RPG rules, and implementation traceability for Habit Tracker RPG.

## Functional Requirements

| ID | Requirement |
| --- | --- |
| `FR-01` | A user can register, log in, log out, and load an authenticated profile. |
| `FR-02` | An authenticated user can create, view, edit, and soft-delete their own habits. |
| `FR-03` | A habit supports name, description, difficulty, frequency, weekly targets, XP reward, and currency reward. |
| `FR-04` | An authenticated user can complete an active habit once per calendar day. |
| `FR-05` | Completing a habit creates a completion log. |
| `FR-06` | Completing a habit grants XP and currency according to difficulty. |
| `FR-07` | Player level is calculated from total XP thresholds. |
| `FR-08` | An authenticated user can view recent habit completion history. |
| `FR-09` | An authenticated user can browse rewards available at their current level. |
| `FR-10` | An authenticated user can buy a reward when they have enough currency. |
| `FR-11` | A reward can be purchased only once by the same player. |
| `FR-12` | Buying a reward deducts currency but never reduces XP or level. |
| `FR-13` | An authenticated user can view purchased rewards in their profile. |
| `FR-14` | The app provides resettable demo data for presentation. |

## Non-Functional Requirements

| ID | Requirement |
| --- | --- |
| `NFR-01` | The app runs as a Dockerized React frontend and Express backend. |
| `NFR-02` | The backend persists data in SQLite. |
| `NFR-03` | User-specific data is protected by authentication middleware. |
| `NFR-04` | API success and error responses are JSON. |
| `NFR-05` | The frontend is responsive for desktop and mobile workflows. |
| `NFR-06` | Mermaid Markdown diagrams are the source of truth for current architecture diagrams. |
| `NFR-07` | Backend and frontend include lint scripts. |
| `NFR-08` | Core backend and frontend behavior is covered by automated tests. |
| `NFR-09` | The app can be started consistently with Docker Compose. |
| `NFR-10` | Documentation supports developer handoff and final presentation. |

## RPG Rules

Difficulty controls both XP and currency rewards.

| Difficulty | XP Reward | Currency Reward |
| --- | ---: | ---: |
| Easy | 10 | 10 |
| Medium | 25 | 25 |
| Hard | 50 | 50 |

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

Currency is separate from XP:

* Completing habits increases XP and currency.
* Buying rewards deducts currency only.
* Buying rewards does not reduce total XP.
* Buying rewards does not downgrade player level.
* Each habit can be completed once per calendar day.

## Deliverables Traceability

| Stakeholder Requirement | Evidence |
| --- | --- |
| Project objective | [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md) |
| Functional and non-functional requirements | This document |
| HLD and data flow | [Developer Handbook.md](Developer%20Handbook.md), [high-level-design.md](diagrams-as-a-code/high-level-design.md), [api-flow-diagram.md](diagrams-as-a-code/api-flow-diagram.md) |
| Component descriptions | [Developer Handbook.md](Developer%20Handbook.md), [package-diagram.md](diagrams-as-a-code/package-diagram.md) |
| Database schema | `../backend/database/schema.sql`, [database-erd.md](diagrams-as-a-code/database-erd.md) |
| GUI design | [gui-wireframes.md](diagrams-as-a-code/gui-wireframes.md), `../frontend/src/pages` |
| Two use case diagrams | [use-case-diagram.md](diagrams-as-a-code/use-case-diagram.md), [use-case-auth-profile.md](diagrams-as-a-code/use-case-auth-profile.md) |
| Class diagram | [class-diagram.md](diagrams-as-a-code/class-diagram.md) |
| Two sequence diagrams | [sequence-habit.md](diagrams-as-a-code/sequence-habit.md), [sequence-reward.md](diagrams-as-a-code/sequence-reward.md) |
| Object/collaboration diagram | [communication-reward-purchase.md](diagrams-as-a-code/communication-reward-purchase.md) |
| Two activity diagrams | [activity-habit.md](diagrams-as-a-code/activity-habit.md), [activity-reward.md](diagrams-as-a-code/activity-reward.md) |
| State diagrams | [state-machine-habit.md](diagrams-as-a-code/state-machine-habit.md), [xp-leveling-state.md](diagrams-as-a-code/xp-leveling-state.md), [reward-lifecycle-state.md](diagrams-as-a-code/reward-lifecycle-state.md) |
| Package diagram | [package-diagram.md](diagrams-as-a-code/package-diagram.md) |
| Deployment diagram | [deployment-diagram.md](diagrams-as-a-code/deployment-diagram.md) |
| Implementation diagrams | [frontend-routing-diagram.md](diagrams-as-a-code/frontend-routing-diagram.md), [error-handling-flow.md](diagrams-as-a-code/error-handling-flow.md), [testing-strategy-diagram.md](diagrams-as-a-code/testing-strategy-diagram.md) |
| Subsequent prototypes | [iteration-one-diagrams](iteration-one-diagrams), [diagrams-as-a-code](diagrams-as-a-code) |
| Final system code | `../frontend`, `../backend`, `../docker-compose.yml` |
