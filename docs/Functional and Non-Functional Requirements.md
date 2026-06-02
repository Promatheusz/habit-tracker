# Functional and Non-Functional Requirements

## Functional Requirements

* Users can register, log in, log out, and load their authenticated profile.
* Users can create, view, update, complete, and deactivate habits.
* Habits support a name, description, difficulty, frequency, weekly targets, XP reward, and currency reward.
* Habit difficulty controls rewards: easy gives 10 XP, medium gives 25 XP, and hard gives 50 XP.
* A habit can be completed only once per calendar day.
* Completing a habit creates a completion log and updates player XP, level, and currency.
* Player levels follow the documented RPG threshold matrix and are based on total XP.
* Users can browse rewards available at their current level.
* Users can purchase rewards when they have enough currency and have not bought the reward before.
* Reward purchases subtract currency but never reduce total XP or player level.
* Users can view purchased rewards and recent habit completion history.

## Non-Functional Requirements

* The application runs as a Dockerized React frontend and Express backend.
* The backend stores data in SQLite and protects user-specific data through authentication.
* API responses use consistent JSON success and error payloads.
* The UI is responsive for desktop and mobile use.
* The project includes Mermaid Markdown diagrams as the maintainable source for UML and architecture documentation.
* The codebase includes linting and test scripts for backend and frontend verification.
* Seed data supports a demo login for presentation and testing.
