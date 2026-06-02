# Project Handoff

This document contains user-facing, presentation, and requirement-traceability notes for the final project handoff.

## User Demo Guide

Open the app at `http://localhost:3000`. Use the demo account:

* Username: `demo`
* Password: `password`

Demo flow:

1. Log in.
2. Show the dashboard with level, XP, currency, today's habits, and recent completions.
3. Open Habits and create a habit.
4. Complete the habit and show the XP/currency update.
5. Try completing the same habit again to show duplicate protection.
6. Open the Reward Shop and buy an affordable reward.
7. Open Profile and show purchased rewards.

## Presentation Pitch

Habit Tracker RPG turns daily habit tracking into a lightweight role-playing progression system. Users complete habits, earn XP and currency, level up, and spend currency on rewards. The system combines a React frontend, Express backend, SQLite database, Docker runtime, and Mermaid documentation-as-code.

## Suggested Defense Order

1. Product objective and market need: [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md).
2. Requirements: [Functional and Non-Functional Requirements.md](Functional%20and%20Non-Functional%20Requirements.md).
3. Architecture: [high-level-design.md](diagrams/high-level-design.md).
4. Data model: [database-erd.md](diagrams/database-erd.md).
5. Main workflows: [habit-crud-sequence.md](diagrams/habit-crud-sequence.md), [sequence-reward.md](diagrams/sequence-reward.md).
6. Runtime: [deployment-diagram.md](diagrams/deployment-diagram.md).
7. Testing: [testing-strategy-diagram.md](diagrams/testing-strategy-diagram.md).
8. Live demo using the flow above.

## Diagrams To Highlight

* [high-level-design.md](diagrams/high-level-design.md)
* [database-erd.md](diagrams/database-erd.md)
* [frontend-routing-diagram.md](diagrams/frontend-routing-diagram.md)
* [habit-crud-sequence.md](diagrams/habit-crud-sequence.md)
* [reward-lifecycle-state.md](diagrams/reward-lifecycle-state.md)
* [deployment-diagram.md](diagrams/deployment-diagram.md)

## Traceability Matrix

| Requirement Area | Implemented Feature | Code Area | Documentation |
| --- | --- | --- | --- |
| Product objective | Gamified habit tracking concept | `README.md` | [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md) |
| Functional requirements | Auth, habits, XP, rewards, profile | `frontend/src/pages`, `backend/src/controllers` | [Functional and Non-Functional Requirements.md](Functional%20and%20Non-Functional%20Requirements.md) |
| Non-functional requirements | Docker, linting, tests, JSON API errors | `docker-compose.yml`, package scripts | [Developer Handbook.md](Developer%20Handbook.md) |
| HLD | React, Express, SQLite architecture | `frontend`, `backend` | [high-level-design.md](diagrams/high-level-design.md) |
| Database schema | SQLite tables and relationships | `backend/database/schema.sql` | [database-erd.md](diagrams/database-erd.md) |
| GUI | Auth, dashboard, habits, rewards, profile | `frontend/src/pages` | [gui-wireframes.md](diagrams/gui-wireframes.md) |
| UML workflows | Use case, sequence, activity, state, package, deployment | App workflows | [docs/diagrams](diagrams) |
| Final presentation | Demo and defense structure | Whole project | This document |

## Handoff Checklist

* Demo account works.
* Docker Compose starts frontend and backend.
* Habit creation and completion work.
* Duplicate same-day habit completion is rejected.
* Reward purchase works when currency is sufficient.
* Purchased rewards appear in Profile.
* Developer commands are documented in [Developer Handbook.md](Developer%20Handbook.md).
* All required project documents are linked from [README.md](README.md).
