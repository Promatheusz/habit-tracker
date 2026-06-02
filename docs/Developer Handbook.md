# Developer Handbook

This is the main technical guide for developers working on Habit Tracker RPG. It combines architecture, API, data model, setup, and testing information in one place.

## Quick Start

Run the full app with Docker:

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`

Backend API: `http://localhost:5001`

Demo account:

* Username: `demo`
* Password: `password`

Stop the app:

```bash
docker compose down
```

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React, React Router, Tailwind CSS |
| Backend | Node.js, Express |
| Database | SQLite |
| Runtime | Docker Compose |
| Quality | ESLint, Prettier, automated tests |
| Documentation | Markdown, Mermaid |

## Architecture

The app is a client-server system. React renders protected screens and calls the backend through `frontend/src/services/api.js`. Express validates requests, authenticates users, applies RPG and habit rules, and stores data in SQLite.

Key diagrams:

* [high-level-design.md](diagrams/high-level-design.md)
* [api-flow-diagram.md](diagrams/api-flow-diagram.md)
* [package-diagram.md](diagrams/package-diagram.md)
* [deployment-diagram.md](diagrams/deployment-diagram.md)
* [frontend-routing-diagram.md](diagrams/frontend-routing-diagram.md)

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
| `docs/diagrams` | Mermaid documentation-as-code |

## Authentication

Registration and login return a signed bearer token. The frontend stores the token in `localStorage` and sends it on authenticated requests.

```http
Authorization: Bearer <token>
```

Related diagram: [auth-sequence.md](diagrams/auth-sequence.md).

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

Create habit request:

```json
{
  "name": "Read 20 pages",
  "description": "Daily reading practice",
  "difficulty": "easy",
  "frequency": "daily"
}
```

Weekly habit request:

```json
{
  "name": "Study React",
  "description": "Practice hooks and routing",
  "difficulty": "medium",
  "frequency": "weekly",
  "target_days_of_week": "1,3,5",
  "target_days_per_week": 3
}
```

Main error responses:

| Status | Meaning |
| --- | --- |
| `400` | Invalid input or insufficient currency |
| `401` | Missing or invalid token |
| `403` | Player level is too low for a reward |
| `404` | Resource not found |
| `409` | Duplicate same-day completion or duplicate reward purchase |
| `500` | Unexpected server error |

Related diagrams:

* [habit-crud-sequence.md](diagrams/habit-crud-sequence.md)
* [sequence-habit.md](diagrams/sequence-habit.md)
* [sequence-reward.md](diagrams/sequence-reward.md)
* [error-handling-flow.md](diagrams/error-handling-flow.md)

## Data Model

The schema is defined in `backend/database/schema.sql`. The ERD is documented in [database-erd.md](diagrams/database-erd.md).

| Table | Purpose |
| --- | --- |
| `players` | User account, hashed password, XP, level, currency |
| `habits` | Player-owned habits with difficulty, frequency, rewards, and soft-delete flag |
| `habit_logs` | Completion history used to prevent duplicate same-day completion |
| `rewards` | Shop reward definitions with cost and required level |
| `player_rewards` | Reward purchase history with unique player/reward pairs |

Important constraints:

* `players.username` is unique.
* `habits.player_id` scopes habits to the authenticated player.
* `habits.is_active` supports soft-delete.
* `player_rewards` prevents buying the same reward twice.

## RPG Rules

Detailed XP, level, currency, and reward rules live in [RPG mechanics.md](RPG%20mechanics.md).

Implementation notes:

* Level is calculated from total XP.
* Currency is spendable and separate from XP.
* Completing a habit increases both XP and currency.
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

## Testing Strategy

Backend tests cover:

* XP reward mapping.
* Level threshold calculations.
* User registration.
* Habit creation and completion.
* Duplicate same-day completion rejection.
* Reward purchase rejection when balance is too low.

Frontend tests cover API service authentication state behavior.

Related diagram: [testing-strategy-diagram.md](diagrams/testing-strategy-diagram.md).

## Developer Acceptance Checklist

Before handing off a change:

* Backend tests pass.
* Frontend tests pass.
* Backend and frontend lint pass.
* Frontend production build succeeds.
* Docker Compose starts both services.
* Documentation links still point to existing files.
