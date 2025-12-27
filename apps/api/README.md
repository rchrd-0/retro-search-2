# @retro-search-2/api

The backend API for Retro Search 2, providing game logic, level data, and leaderboard management. Built with Hono and Drizzle.

## Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: [Hono](https://hono.dev/)
- **Database**: Turso (LibSQL) / SQLite
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Validation**: [Valibot](https://valibot.dev/)

## Getting Started

### Database Setup

This project uses Turso (LibSQL) or local SQLite as the database provider. Before running the API, you need to set up the database.

1. **Generate Migrations**:
   ```bash
   bun run db:generate
   ```

2. **Run Migrations**:
   Applies the schema to the database (local `dev.db` or remote Turso).
   ```bash
   bun run db:migrate
   ```

3. **Seed Database**:
   Populates the database with initial levels and characters.
   ```bash
   bun run db:seed
   ```

### Development

Start the development server with hot reloading:

```bash
bun run dev
```

The API will be available at http://localhost:3001.

### Production

The API is configured for deployment on [Fly.io](https://fly.io).

1. **Deploy**:
   Run from the project root:
   ```bash
   fly deploy -c apps/api/fly.toml --dockerfile apps/api/Dockerfile
   ```

2. **Run Migrations (Production)**:
   ```bash
   bun run db:migrate:prod
   ```
   *Note: Ensure `.env.prod` contains the production `DATABASE_URL` and `TURSO_AUTH_TOKEN`.*

3. **Seed Production**:
   ```bash
   bun --env-file=.env.prod db:seed
   ```

## Scripts

Run these commands from the `apps/api` directory.

- `bun run dev`: Start the development server.
- `bun run db:generate`: Generate the Drizzle migrations.
- `bun run db:migrate`: Apply database migrations.
- `bun run db:seed`: Seed the database with initial data.
- `bun run db:reset`: Reset the database (drops all data and re-applies migrations).
- `bun run check`: Run type checking and linting.
- `bun run format`: Format code using Biome.
