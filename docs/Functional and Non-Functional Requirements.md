# Functional And Non-Functional Requirements

This document defines the app behavior in numbered requirements. Implementation and test details are summarized in [Developer Handbook.md](Developer%20Handbook.md).

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
| `FR-14` | The app provides demo seed data for presentation. |

## Non-Functional Requirements

| ID | Requirement |
| --- | --- |
| `NFR-01` | The app runs as a Dockerized React frontend and Express backend. |
| `NFR-02` | The backend persists data in SQLite. |
| `NFR-03` | User-specific data is protected by authentication middleware. |
| `NFR-04` | API success and error responses are JSON. |
| `NFR-05` | The frontend is responsive for desktop and mobile workflows. |
| `NFR-06` | Mermaid Markdown diagrams are the source of truth for diagrams. |
| `NFR-07` | Backend and frontend include lint scripts. |
| `NFR-08` | Core backend and frontend behavior is covered by automated tests. |
| `NFR-09` | The app can be started consistently with Docker Compose. |
| `NFR-10` | Documentation supports developer handoff and final presentation. |

## Related Documentation

* [RPG mechanics.md](RPG%20mechanics.md)
* [Developer Handbook.md](Developer%20Handbook.md)
* [Project Handoff.md](Project%20Handoff.md)
* [api-flow-diagram.md](diagrams/api-flow-diagram.md)
* [error-handling-flow.md](diagrams/error-handling-flow.md)
