# Retro Search 2

A "Where's Waldo" style hidden object game built with a modern web stack. Players race against the clock to find characters in various levels and compete for the top spot on the leaderboards.

## Tech Stack

- **Runtime**: [Bun](https://bun.com)
- **Monorepo**: Bun Workspaces
- **Frontend**: React (with React Compiler), Vite, TailwindCSS, Shadcn UI, TanStack Query
- **Backend**: Hono
- **Database**: SQLite with Prisma ORM
- **Validation**: Valibot
- **Linting/Formatting**: Biome

## Project Structure

- `apps/client`: The React frontend application
- `apps/api`: The Hono backend API
- `packages/shared`: Shared types, schemas, and utilities

## Getting Started

### Prerequisites

- [Bun](https://bun.com) (v1.3.3 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rchrd-0/retro-search-2.git
   cd retro-search-2
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up the database:
   ```bash
   cd apps/api
   bun run db:migrate
   bun run db:seed
   ```

### Running the Project

To start both the client and server in development mode:

```bash
bun run dev
```

- **Client**: http://localhost:3000
- **API**: http://localhost:3001

## Scripts

- `bun run dev`: Start development servers for all apps
- `bun run check`: Run type checking and linting
- `bun run format`: Format code using Biome
