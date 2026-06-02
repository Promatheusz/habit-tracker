# Project Requirements

This document is the authoritative project-deliverables checklist. Detailed functional behavior is documented in [Functional and Non-Functional Requirements.md](Functional%20and%20Non-Functional%20Requirements.md).

## Team And Project Organization

| Requirement | Status | Evidence |
| --- | --- | --- |
| Team project with defined roles and workflow | Prepared | [CONTRIBUTING.md](../CONTRIBUTING.md) |
| Project objective based on market need | Complete | [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md) |
| Final presentation support | Complete | [Project Handoff.md](Project%20Handoff.md) |

## Documentation Deliverables

| Requirement | Status | Evidence |
| --- | --- | --- |
| Project objective and scope | Complete | [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md) |
| Functional and non-functional requirements | Complete | [Functional and Non-Functional Requirements.md](Functional%20and%20Non-Functional%20Requirements.md) |
| High-level design | Complete | [high-level-design.md](diagrams/high-level-design.md), [Developer Handbook.md](Developer%20Handbook.md) |
| Component/package description | Complete | [package-diagram.md](diagrams/package-diagram.md) |
| Data flow descriptions | Complete | [api-flow-diagram.md](diagrams/api-flow-diagram.md) |
| Database schema and ERD | Complete | [database-erd.md](diagrams/database-erd.md) |
| GUI wireframes | Complete | [gui-wireframes.md](diagrams/gui-wireframes.md) |
| Developer setup and test guide | Complete | [Developer Handbook.md](Developer%20Handbook.md) |

## UML And Diagram Deliverables

Mermaid Markdown files in `docs/diagrams` are the diagram source of truth.

| Requirement | Evidence |
| --- | --- |
| Use case diagrams | [use-case-diagram.md](diagrams/use-case-diagram.md), [use-case-auth-profile.md](diagrams/use-case-auth-profile.md) |
| Class diagram | [class-diagram.md](diagrams/class-diagram.md) |
| Sequence diagrams | [sequence-habit.md](diagrams/sequence-habit.md), [sequence-reward.md](diagrams/sequence-reward.md), [auth-sequence.md](diagrams/auth-sequence.md), [habit-crud-sequence.md](diagrams/habit-crud-sequence.md) |
| Activity diagrams | [activity-habit.md](diagrams/activity-habit.md), [activity-reward.md](diagrams/activity-reward.md) |
| Communication diagram | [communication-reward-purchase.md](diagrams/communication-reward-purchase.md) |
| State machine diagrams | [state-machine-habit.md](diagrams/state-machine-habit.md), [xp-leveling-state.md](diagrams/xp-leveling-state.md), [reward-lifecycle-state.md](diagrams/reward-lifecycle-state.md) |
| Package diagram | [package-diagram.md](diagrams/package-diagram.md) |
| Deployment diagram | [deployment-diagram.md](diagrams/deployment-diagram.md) |

## Implementation Deliverables

| Requirement | Status | Evidence |
| --- | --- | --- |
| React frontend | Complete | `frontend/src` |
| Express backend | Complete | `backend/src` |
| SQLite schema | Complete | `backend/database/schema.sql` |
| Authentication | Complete | `backend/src/controllers/authController.js` |
| Habit management | Complete | `backend/src/controllers/habitController.js` |
| Reward shop | Complete | `backend/src/controllers/playerController.js` |
| RPG mechanics | Complete | [RPG mechanics.md](RPG%20mechanics.md), `backend/src/utils/levelSystem.js` |
| Tests and quality checks | Complete | [Developer Handbook.md](Developer%20Handbook.md) |
