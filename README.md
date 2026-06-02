# 🛡️ Gamification of Personal Development

The project is a system for the gamification of personal development based on RPG mechanics. Users earn experience points and rewards for completing daily tasks and habits. The system utilizes a React frontend and a Node.js backend with an SQLite database. The objective of the application is to support users in achieving their goals through engaging elements known from video games.

### 🛠️ Technologies

| Area | Technology |
| --- | --- |
| **Language** | JavaScript |
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | SQLite |
| **Tools** | Git, Docker, ESLint, Prettier |

### 🚀 Project Operation

#### 1. Cloning the repository

```bash
# Clone the remote repository to the local environment
git clone <repository-url>
```

#### 2. Starting and stopping containers

* **System startup:** `docker-compose up --build`
* **System shutdown:** `docker-compose down`
* **Demo account:** username `demo`, password `password`

The frontend is available at `http://localhost:3000`. The backend API is mapped to `http://localhost:5001`.

### API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a player account |
| `POST` | `/api/auth/login` | Log in and receive a bearer token |
| `GET` | `/api/auth/me` | Load the authenticated player |
| `GET` | `/api/player` | Load player stats |
| `GET` | `/api/habits` | List active habits |
| `POST` | `/api/habits` | Create a habit |
| `PUT` | `/api/habits/:id` | Update a habit |
| `DELETE` | `/api/habits/:id` | Deactivate a habit |
| `POST` | `/api/habits/:id/complete` | Complete a habit for XP and currency |
| `GET` | `/api/habit-logs` | List recent completion history |
| `GET` | `/api/rewards` | List level-available rewards |
| `POST` | `/api/rewards/:id/buy` | Purchase a reward |
| `GET` | `/api/rewards/purchased` | List purchased rewards |

### Documentation And Diagrams

Project documentation is stored in `/docs`. Mermaid Markdown diagrams in `/docs/diagrams` are the source of truth for UML and architecture deliverables.

Key documents:

* `docs/High-Level Design.md`
* `docs/Database ERD.md`
* `docs/GUI Wireframes.md`
* `docs/Functional and Non-Functional Requirements.md`
* `docs/RPG mechanics.md`

#### 3. Working with code (Push & Pull Request)

* **Pushing changes to the server:**
```bash
# Push the local branch updates to the remote tracking repository
git push origin <branch-name>
```

* **Creating a Pull Request:**
After pushing the changes to the server, navigate to the repository page on GitHub within your browser and use the **"Compare & pull request"** button to initiate the code review process by the Scrum Master.
