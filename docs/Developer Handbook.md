# Developer Handbook

This handbook explains how the Habit Tracker RPG system is built, how its components communicate, and how to run, test, and present it.

## Quick Start

Run the full app with Docker:

```bash
docker compose up --build
```

Open:

* Frontend: `http://localhost:3000`
* Backend API: `http://localhost:5001`

Demo account:

* Username: `demo`
* Password: `password`

Stop the app:

```bash
docker compose down
```

Reset the presentation database:

```bash
docker compose exec backend npm run db:demo-reset
```

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React, React Router, Tailwind CSS |
| Backend | Node.js, Express |
| Database | SQLite |
| Runtime | Docker Compose |
| Quality | ESLint, Prettier, automated tests |
| Documentation | Markdown, Mermaid, Draw.io |

## High-Level Architecture

Habit Tracker RPG is a client-server web app.

| Component | Description |
| --- | --- |
| React frontend | Renders Auth, Dashboard, Habits, Rewards, and Profile screens. It stores the auth token in `localStorage` and calls the API through `frontend/src/services/api.js`. |
| Express backend | Exposes JSON API routes, validates requests, applies auth and business rules, and returns success or error responses. |
| SQLite database | Stores players, habits, completion logs, reward definitions, and purchased rewards. |
| Docker Compose | Runs frontend and backend containers and persists SQLite data in a named volume. |

Main architecture diagrams:

* [high-level-design.md](diagrams-as-a-code/high-level-design.md)
* [api-flow-diagram.md](diagrams-as-a-code/api-flow-diagram.md)
* [package-diagram.md](diagrams-as-a-code/package-diagram.md)
* [deployment-diagram.md](diagrams-as-a-code/deployment-diagram.md)
* [frontend-routing-diagram.md](diagrams-as-a-code/frontend-routing-diagram.md)

## Data Flow

The frontend sends authenticated requests to the backend with:

```http
Authorization: Bearer <token>
```

Typical habit completion flow:

1. The user clicks Complete on a habit.
2. React sends `POST /api/habits/:id/complete`.
3. Auth middleware verifies the bearer token.
4. The habit controller checks ownership, active state, and same-day duplicate completion.
5. The backend inserts a `habit_logs` row.
6. The backend updates player XP, level, and currency.
7. The frontend receives updated player data and refreshes the UI.

Typical reward purchase flow:

1. The user clicks Buy on a reward.
2. React sends `POST /api/rewards/:id/buy`.
3. The backend checks level, currency, and duplicate purchase rules.
4. The backend inserts a `player_rewards` row and deducts currency.
5. The frontend updates Reward Shop and Profile state.

Related diagrams:

* [sequence-habit.md](diagrams-as-a-code/sequence-habit.md)
* [sequence-reward.md](diagrams-as-a-code/sequence-reward.md)
* [habit-crud-sequence.md](diagrams-as-a-code/habit-crud-sequence.md)
* [communication-reward-purchase.md](diagrams-as-a-code/communication-reward-purchase.md)

## Source Structure

| Path | Purpose |
| --- | --- |
| `frontend/src/pages` | Route-level screens: auth, dashboard, habits, rewards, profile |
| `frontend/src/components` | Shared UI: layout, navigation, task cards, XP bar |
| `frontend/src/services/api.js` | API client and token storage |
| `backend/src/routes` | Express route definitions |
| `backend/src/controllers` | Request handlers and workflow logic |
| `backend/src/middleware` | Authentication middleware |
| `backend/src/utils` | Auth helpers and RPG level logic |
| `backend/database/schema.sql` | SQLite schema |
| `backend/database/demo-reset.sql` | Resettable presentation dataset |
| `backend/scripts/resetDemoDb.js` | Demo database reset runner |
| `docs/diagrams-as-a-code` | Current Mermaid diagrams |
| `docs/iteration-one-diagrams` | First-iteration Draw.io prototypes |

## API Reference

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | No | Create a player account |
| `POST` | `/api/auth/login` | No | Log in and receive a token |
| `GET` | `/api/auth/me` | Yes | Load authenticated player |
| `GET` | `/api/player` | Yes | Load player stats |
| `GET` | `/api/habits` | Yes | List active habits |
| `POST` | `/api/habits` | Yes | Create a habit |
| `PUT` | `/api/habits/:id` | Yes | Update a habit |
| `DELETE` | `/api/habits/:id` | Yes | Soft-delete a habit |
| `POST` | `/api/habits/:id/complete` | Yes | Complete a habit |
| `GET` | `/api/habit-logs` | Yes | List recent completions |
| `GET` | `/api/rewards` | Yes | List rewards available for the current level |
| `POST` | `/api/rewards/:id/buy` | Yes | Buy a reward |
| `GET` | `/api/rewards/purchased` | Yes | List purchased rewards |

Common error statuses:

| Status | Meaning |
| --- | --- |
| `400` | Invalid input, insufficient currency, or duplicate reward purchase |
| `401` | Missing, invalid, or expired token |
| `403` | Player level is too low for a reward |
| `404` | Resource not found |
| `409` | Habit was already completed today |
| `500` | Unexpected server error |

## Database Schema

The schema is defined in `backend/database/schema.sql`. The ERD is documented in [database-erd.md](diagrams-as-a-code/database-erd.md).

| Table | Purpose |
| --- | --- |
| `players` | User account, hashed password, XP, level, currency |
| `habits` | Player-owned habits with difficulty, frequency, rewards, and soft-delete flag |
| `habit_logs` | Completion history and duplicate same-day completion checks |
| `rewards` | Shop reward definitions with cost and required level |
| `player_rewards` | Reward purchase history with unique player/reward pairs |

Important constraints:

* `players.username` is unique.
* `habits.player_id` scopes habits to the authenticated player.
* `habits.is_active` supports soft-delete.
* `player_rewards` prevents buying the same reward twice.

## GUI Design

The frontend is organized around five user-facing screens:

| Screen | Purpose |
| --- | --- |
| Auth | Register and log in. |
| Dashboard | Show level, XP, currency, today’s habits, and recent completions. |
| Habits | Create, edit, complete, and soft-delete habits. |
| Reward Shop | Browse and buy available rewards. |
| Profile | Show player progression, purchased rewards, and recent activity. |

GUI wireframes are documented in [gui-wireframes.md](diagrams-as-a-code/gui-wireframes.md).

## Low-Level Architecture Map

| Requirement | Diagram Evidence |
| --- | --- |
| Use case diagrams | [use-case-diagram.md](diagrams-as-a-code/use-case-diagram.md), [use-case-auth-profile.md](diagrams-as-a-code/use-case-auth-profile.md) |
| Class diagram | [class-diagram.md](diagrams-as-a-code/class-diagram.md) |
| Sequence diagrams | [sequence-habit.md](diagrams-as-a-code/sequence-habit.md), [sequence-reward.md](diagrams-as-a-code/sequence-reward.md), [auth-sequence.md](diagrams-as-a-code/auth-sequence.md), [habit-crud-sequence.md](diagrams-as-a-code/habit-crud-sequence.md) |
| Object/collaboration diagram | [communication-reward-purchase.md](diagrams-as-a-code/communication-reward-purchase.md) |
| Activity diagrams | [activity-habit.md](diagrams-as-a-code/activity-habit.md), [activity-reward.md](diagrams-as-a-code/activity-reward.md) |
| State diagrams | [state-machine-habit.md](diagrams-as-a-code/state-machine-habit.md), [xp-leveling-state.md](diagrams-as-a-code/xp-leveling-state.md), [reward-lifecycle-state.md](diagrams-as-a-code/reward-lifecycle-state.md) |
| Package diagram | [package-diagram.md](diagrams-as-a-code/package-diagram.md) |
| Deployment diagram | [deployment-diagram.md](diagrams-as-a-code/deployment-diagram.md) |
| Implementation diagrams | [frontend-routing-diagram.md](diagrams-as-a-code/frontend-routing-diagram.md), [error-handling-flow.md](diagrams-as-a-code/error-handling-flow.md), [testing-strategy-diagram.md](diagrams-as-a-code/testing-strategy-diagram.md) |

## Implementation Notes

RPG rules are implemented in `backend/src/utils/levelSystem.js`.

* Easy habits grant 10 XP and 10 currency.
* Medium habits grant 25 XP and 25 currency.
* Hard habits grant 50 XP and 50 currency.
* Level is calculated from total XP thresholds.
* Currency is spendable and separate from XP.
* Completing a habit increases XP and currency.
* Buying rewards deducts currency only.
* A habit can be completed once per calendar day.

## Development Commands

Backend:

```bash
cd backend
npm install
npm test
npm run lint
npm run format
npm run db:demo-reset
```

Frontend:

```bash
cd frontend
npm install
npm test -- --runInBand
npm run lint
npm run build
npm run format
```

Docker smoke check:

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose down
```

## Demo Flow

1. Log in with `demo/password`.
2. Show Dashboard level, XP, currency, today’s habits, and recent completions.
3. Open Habits and create a habit.
4. Complete the habit and show the XP/currency update.
5. Try completing the same habit again to show duplicate protection.
6. Open Reward Shop and buy an affordable reward.
7. Open Profile and show purchased rewards.

## Testing Strategy

Backend tests cover:

* XP reward mapping.
* Level threshold calculations.
* User registration and login.
* Authenticated profile lookup.
* Habit creation, editing, completion, and soft-delete.
* Duplicate same-day completion rejection.
* Reward purchase success and failure paths.

Frontend tests cover:

* API service authentication state behavior.
* Protected route redirects.
* Logout navigation behavior.
* Habit create/update form submissions.
* Invalid weekly habit form messaging.
* Reward buy button disabled state when currency is too low.

Related diagram: [testing-strategy-diagram.md](diagrams-as-a-code/testing-strategy-diagram.md).
