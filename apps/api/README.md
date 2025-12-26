# @retro-search-2/api

The backend API for Retro Search 2, providing game logic, level data, and leaderboard management. Built with Hono and Prisma.

## Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Framework**: [Hono](https://hono.dev/)
- **Database**: SQLite
- **ORM**: [Prisma](https://www.prisma.io/)
- **Validation**: [Valibot](https://valibot.dev/)

## Getting Started

### Database Setup

This project uses SQLite as the database provider. Before running the API, you need to set up the database.

1. **Generate Prisma Client**:
   ```bash
   bun run db:generate
   ```

2. **Run Migrations**:
   Creates the SQLite database file (`dev.db`) and applies the schema.
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

## Scripts

Run these commands from the `apps/api` directory.

- `bun run dev`: Start the development server.
- `bun run db:generate`: Generate the Prisma Client based on the schema.
- `bun run db:migrate`: Apply database migrations.
- `bun run db:seed`: Seed the database with initial data.
- `bun run db:reset`: Reset the database (drops all data and re-applies migrations).
- `bun run check`: Run type checking and linting.
- `bun run format`: Format code using Biome.