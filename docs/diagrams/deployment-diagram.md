# Deployment Diagram - Docker Runtime

```mermaid
flowchart TB
    user["User Browser"]

    subgraph docker[Docker Compose Host]
        frontend["frontend container\nReact dev server :3000"]
        backend["backend container\nExpress API :5000 mapped to :5001"]
        volume["sqlite_data volume"]
    end

    user -->|HTTP :3000| frontend
    frontend -->|HTTP /api :5001| backend
    backend --> volume
```
