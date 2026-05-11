Welcome to the **Habit Tracker RPG** development team! To maintain high code quality and a professional workflow, all contributors must follow these guidelines.

## 1. Branching Strategy

Development happens on separate branches to ensure the stability of the main project.

* **feature/**: Use this for new functionalities like RPG mechanics or UI components.
* *Example*: `feature/xp-calculation-logic`
* *Example*: `feature/player-inventory-view`


* **fix/**: Use this for bug fixes and resolving technical issues.
* *Example*: `fix/sqlite-connection-error`
* *Example*: `fix/tailwind-responsive-glitch`


* **docs/**: Use this for updating Markdown files or JSDoc documentation.
* *Example*: `docs/update-uml-diagrams`
* *Example*: `docs/api-endpoint-definitions`

---

## 2. Commit Message Standards

We follow the **Conventional Commits** standard to keep our GitHub history clear and searchable.

* **feat**: A new feature for the system.
* *Example*: `feat: add progressive level up system`


* **fix**: A bug fix in the application.
* *Example*: `fix: resolve xp overflow on reward purchase`


* **docs**: Changes to documentation files or JSDoc comments.
* *Example*: `docs: add jsdoc to shop controller functions`


* **style**: Changes that do not affect the meaning of the code such as Prettier formatting.
* *Example*: `style: run prettier on frontend components`



---

## 3. Development Workflow

* **Environment**: Always run the system via **Docker Desktop** to maintain consistency across Windows and macOS environments.
* **Coding Standards**: All code must pass **ESLint** and **Prettier** checks to ensure a unified writing style among all team members.
* **Documentation**: Use **JSDoc** for backend logic and **Draw.io** for all required UML diagrams including use case and sequence diagrams.
* **Pushing Code**: Use the standard `git push origin <branch-name>` command to upload your changes.

---

## 4. Pull Request (PR) Process

Every feature must be verified and approved by the **Scrum Master** before being merged into the main branch.

### PR Requirements

* **Title**: Use a clear and descriptive title including the task ID if applicable.
* *Example*: `[FE] #12 Implement XP Progress Bar Component`


* **Link Tasks**: Reference the specific task from the GitHub project board to ensure proper tracking.
* **Code Review**: The Scrum Master will analyze changes with AI support to ensure technical compliance and logic integrity.

### Description Template

Copy and use the following template for every Pull Request:

```markdown
## What does this PR do?
Summarize the changes (e.g., "Added a React component for the XP bar and integrated it with the backend API").

## Linked Issues
Closes #12

## Technical Changes
- Added X component to /src/components.
- Updated SQLite schema in /backend/models.
- Added JSDoc for XP calculation utility.
```

---

## 5. Technology Stack Summary

Ensure your contributions align with our chosen tools:

* **Language**: JavaScript
* **Frontend**: React.js with Tailwind CSS
* **Backend**: Node.js with Express
* **Database**: SQLite
* **Modeling**: Draw.io for UML notation