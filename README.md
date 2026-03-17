# Dragonvite

A production-ready monorepo for Dragonvite — a real-time browser game built with React, Fastify, and Supabase.

## Prerequisites

| Tool                                                              | Version    |
| ----------------------------------------------------------------- | ---------- |
| [Node.js](https://nodejs.org/)                                    | >= 18.17.0 |
| [pnpm](https://pnpm.io/installation)                              | >= 8.0.0   |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | Latest     |
| [Git](https://git-scm.com/)                                       | Latest     |

> **Note:** Docker Desktop must be running before you start any dev commands.

## Getting Started

### 1. Clone the repo

```bash
git clone <repo-url>
cd dragonvite
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Get `.env.local` from the team (shared out of band), and place it in the repo root. It contains all the credentials needed to connect to the shared dev database and services.

If you need to see what variables are required, `.env.example` in the repo root documents all of them.

### 4. Push the database schema

```bash
pnpm db:push
```

This syncs the Prisma schema to the Supabase database. Run once on first setup and whenever the schema changes.

### 5. Start the stack

```bash
pnpm dev
```

On first run Docker will pull and build images — this takes a few minutes.

| Service     | URL                        | Description                 |
| ----------- | -------------------------- | --------------------------- |
| Frontend    | http://localhost           | React app (served by Nginx) |
| Backend API | http://localhost/api       | Fastify REST API            |
| WebSocket   | http://localhost/socket.io | Socket.io                   |
| Bull Board  | http://localhost:3001      | Job queue dashboard         |
| SonarQube   | http://localhost:9000      | Code quality (admin/admin)  |

## Development Commands

```bash
pnpm build          # Build all packages
pnpm test           # Run all tests (Vitest)
pnpm test:e2e       # Run Playwright E2E tests
pnpm lint           # ESLint check
pnpm format         # Format with Prettier
pnpm type-check     # TypeScript type check across all packages
```

### Single package

```bash
pnpm --filter @dragonvite/backend test
pnpm --filter @dragonvite/frontend test
```

## Project Structure

```
dragonvite/
├── apps/
│   ├── frontend/           # Vite + React 18 + TypeScript
│   │   └── src/
│   │       ├── components/
│   │       ├── pages/
│   │       ├── hooks/
│   │       ├── store/      # Zustand
│   │       └── utils/
│   └── backend/            # Fastify + TypeScript
│       └── src/
│           ├── routes/     # REST endpoints
│           ├── services/   # Business logic
│           ├── jobs/       # BullMQ workers
│           └── config.ts   # Zod-validated env vars
├── packages/
│   ├── shared/             # Shared types, constants, utils
│   └── database/           # Prisma schema & migrations
├── .github/workflows/      # GitHub Actions CI/CD
├── docker-compose.yml
├── Dockerfile
└── nginx.conf
```

## Database

```bash
pnpm db:push        # Sync schema to dev DB (no migration file created)
pnpm db:migrate     # Create a new migration file
pnpm db:studio      # Open Prisma Studio (visual DB browser)
```

## Troubleshooting

**Containers fail to start**

```bash
docker-compose down -v      # Tear down containers and volumes
docker-compose up --build   # Rebuild from scratch
```

**`.env.local` missing**

Docker Compose will fail to start the backend without this file. Make sure it's in the repo root — get it from the team if you don't have it.

**Backend crashes on startup with config errors**

All required env vars are validated at boot via Zod. Check the error message — it will name the missing or invalid variable. Make sure `.env.local` is complete and has no stray quotes or whitespace.

**Port already in use**

```bash
# macOS / Linux
lsof -i :80
kill -9 <PID>

# Windows (PowerShell)
netstat -ano | findstr :80
taskkill /PID <PID> /F
```

**`pnpm db:push` fails**

Verify your `DATABASE_URL` in `.env.local` is correct and that the Supabase project is fully provisioned.

**SonarQube is slow to start**

SonarQube takes 1–2 minutes to initialize on first boot. Wait for the log line `SonarQube is operational` before trying to access it.

## CI/CD

GitHub Actions runs automatically on every PR and push to `main`:

| Workflow        | Trigger           | What it does                   |
| --------------- | ----------------- | ------------------------------ |
| `lint.yml`      | PR + push to main | ESLint + Prettier              |
| `test.yml`      | PR + push to main | Vitest unit tests              |
| `build.yml`     | PR + push to main | Docker build validation        |
| `sonarqube.yml` | PR + push to main | Code quality gate (SonarCloud) |
| `deploy.yml`    | **Manual only**   | SSH deploy to Oracle Cloud     |

## Deployment

Production runs on Oracle Cloud Always Free (2 ARM vCPU, 4 GB RAM).

**First-time VM setup:**

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

**Deploy:**

```bash
git clone <repo-url>
cd dragonvite
# Place .env.local with production values in the repo root
docker compose up -d
```

Or trigger the `deploy.yml` workflow manually from the GitHub Actions tab (requires `ORACLE_HOST`, `ORACLE_USER`, and `ORACLE_SSH_KEY` in GitHub Secrets).

## Tech Stack

**Frontend:** React 18, Vite, TypeScript, MUI, TanStack Query, Zustand, React Konva, Socket.io

**Backend:** Fastify, TypeScript, Prisma, Socket.io, BullMQ, Zod, Pino

**Infrastructure:** Docker Compose, Nginx, Redis, Supabase (PostgreSQL), SonarQube, GitHub Actions

## License

MIT
