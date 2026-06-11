# Project Documentation

This folder contains the stakeholder-facing documentation for Habit Tracker RPG. The top-level files explain the project, requirements, architecture, implementation, and handoff notes. Mermaid diagrams live in `diagrams-as-a-code`, and first-iteration Draw.io diagrams live in `iteration-one-diagrams`.

## Start Here

| Document | Purpose |
| --- | --- |
| [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md) | Product objective, scope, market need, target users, and value. |
| [Functional and Non-Functional Requirements.md](Functional%20and%20Non-Functional%20Requirements.md) | Functional requirements, non-functional requirements, RPG rules, deliverables, and traceability. |
| [Developer Handbook.md](Developer%20Handbook.md) | Setup, architecture, data flow, database schema, UI design, API, implementation, testing, and demo reset steps. |

## Stakeholder Checklist

| Requirement | Evidence |
| --- | --- |
| Project objective | [Project Objective and Market Analysis.md](Project%20Objective%20and%20Market%20Analysis.md) |
| Functional and non-functional requirements | [Functional and Non-Functional Requirements.md](Functional%20and%20Non-Functional%20Requirements.md) |
| High-level architecture and data flow | [Developer Handbook.md](Developer%20Handbook.md), [high-level-design.md](diagrams-as-a-code/high-level-design.md), [api-flow-diagram.md](diagrams-as-a-code/api-flow-diagram.md) |
| Component diagrams and descriptions | [Developer Handbook.md](Developer%20Handbook.md), [package-diagram.md](diagrams-as-a-code/package-diagram.md) |
| Database schema | [Developer Handbook.md](Developer%20Handbook.md), [database-erd.md](diagrams-as-a-code/database-erd.md), `../backend/database/schema.sql` |
| GUI user interface design | [Developer Handbook.md](Developer%20Handbook.md), [gui-wireframes.md](diagrams-as-a-code/gui-wireframes.md) |
| Low-level UML architecture | [Developer Handbook.md](Developer%20Handbook.md), diagram index below |
| Implementation prototypes | [iteration-one-diagrams](iteration-one-diagrams), [diagrams-as-a-code](diagrams-as-a-code) |
| Final system code | `../frontend`, `../backend`, `../docker-compose.yml` |

## Diagram Index

### High-Level Design

| Diagram | Purpose |
| --- | --- |
| [high-level-design.md](diagrams-as-a-code/high-level-design.md) | System architecture and main responsibilities. |
| [api-flow-diagram.md](diagrams-as-a-code/api-flow-diagram.md) | Request and response flow through frontend, backend, and database. |
| [package-diagram.md](diagrams-as-a-code/package-diagram.md) | Source-code package structure. |
| [deployment-diagram.md](diagrams-as-a-code/deployment-diagram.md) | Docker deployment view. |
| [frontend-routing-diagram.md](diagrams-as-a-code/frontend-routing-diagram.md) | Frontend route structure and protected pages. |

### Low-Level UML

| Diagram Type | Evidence |
| --- | --- |
| Use case diagrams | [use-case-diagram.md](diagrams-as-a-code/use-case-diagram.md), [use-case-auth-profile.md](diagrams-as-a-code/use-case-auth-profile.md) |
| Class diagram | [class-diagram.md](diagrams-as-a-code/class-diagram.md) |
| Sequence diagrams | [sequence-habit.md](diagrams-as-a-code/sequence-habit.md), [sequence-reward.md](diagrams-as-a-code/sequence-reward.md), [auth-sequence.md](diagrams-as-a-code/auth-sequence.md), [habit-crud-sequence.md](diagrams-as-a-code/habit-crud-sequence.md) |
| Communication/object diagram | [communication-reward-purchase.md](diagrams-as-a-code/communication-reward-purchase.md) |
| Activity diagrams | [activity-habit.md](diagrams-as-a-code/activity-habit.md), [activity-reward.md](diagrams-as-a-code/activity-reward.md) |
| State diagrams | [state-machine-habit.md](diagrams-as-a-code/state-machine-habit.md), [xp-leveling-state.md](diagrams-as-a-code/xp-leveling-state.md), [reward-lifecycle-state.md](diagrams-as-a-code/reward-lifecycle-state.md) |

### UI, Data, Errors, And Testing

| Diagram | Purpose |
| --- | --- |
| [gui-wireframes.md](diagrams-as-a-code/gui-wireframes.md) | Main screen wireframes. |
| [database-erd.md](diagrams-as-a-code/database-erd.md) | SQLite entities and relationships. |
| [error-handling-flow.md](diagrams-as-a-code/error-handling-flow.md) | Main API error paths. |
| [testing-strategy-diagram.md](diagrams-as-a-code/testing-strategy-diagram.md) | Test coverage strategy. |

## Demo

Run the app with Docker and use the demo account:

```bash
docker compose up --build
```

* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:5001`
* Username: `demo`
* Password: `password`

Reset the presentation database when needed:

```bash
docker compose exec backend npm run db:demo-reset
```
