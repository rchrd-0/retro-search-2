# @retro-search-2/api

The backend API for Retro Search 2, providing game logic, level data, and leaderboard management. Built with Hono and Drizzle.

## Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: [Hono](https://hono.dev/)
- **Database**: PostgreSQL ([Neon](https://neon.tech) in production, Docker locally)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Validation**: [Valibot](https://valibot.dev/)

## Getting Started

### Database Setup

A `docker-compose.yml` is included for local development. Start it before running migrations:

```bash
docker compose up -d
```

Then run:

1. **Generate Migrations**:
   ```bash
   bun run db:generate
   ```

2. **Apply Migrations**:
   ```bash
   bun run db:migrate
   ```

3. **Seed Database**:
   ```bash
   bun run db:seed
   ```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```
DATABASE_URL=postgresql://postgres:dev@localhost:5432/retro-search-2
FRONTEND_URL=http://localhost:3000
CDN_URL=https://...
PORT=3001
```

For production, `DATABASE_URL` should point to your Neon connection string.

### Development

Start the development server with hot reloading:

```bash
bun run dev
```

The API will be available at http://localhost:3001.

### Production

The API is deployed on [Fly.io](https://fly.io) (`sin` region).

1. **Deploy**:
   ```bash
   fly deploy -c apps/api/fly.toml --dockerfile apps/api/Dockerfile
   ```

2. **Run Migrations (Production)**:
   ```bash
   bun run db:migrate:prod
   ```
   *Note: Ensure `.env.prod` contains the production `DATABASE_URL`.*

3. **Seed Production**:
   ```bash
   bun --env-file=.env.prod db:seed
   ```

## Scripts

Run these commands from the `apps/api` directory.

- `bun run dev`: Start the development server.
- `bun run db:generate`: Generate Drizzle migrations from schema changes.
- `bun run db:migrate`: Apply pending migrations.
- `bun run db:seed`: Seed the database with initial data.
- `bun run db:reset`: Drop all data and re-apply migrations + seed.
- `bun run db:studio`: Open Drizzle Studio.
- `bun run check`: Run type checking and linting.
- `bun run format`: Format code using Biome.
