# @retro-search-2/client

The frontend application for Retro Search 2, a hidden object game. Built with React, Vite, and TailwindCSS.

## Features

- **Interactive Gameplay**: Pan and zoom to find hidden characters in detailed level images.
- **Leaderboards**: Compete with other players for the fastest times.
- **Responsive Design**: Works on various screen sizes.
- **Optimistic UI**: Instant feedback for user actions.

## Tech Stack

- **Framework**: [React](https://react.dev/) (with React Compiler)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management/Data Fetching**: [TanStack Query](https://tanstack.com/query/latest)
- **HTTP Client**: [Ky](https://github.com/sindresorhus/ky)
- **Validation**: [Valibot](https://valibot.dev/)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## Scripts

Run these commands from the `apps/client` directory or via the root workspace scripts.

### Development

Start the development server:

```bash
bun run dev
```

The app will be available at http://localhost:3000.

### Build

Build the application for production:

```bash
bun run build
```

### Linting & Formatting

Check for linting and formatting issues:

```bash
bun run check
```

Fix auto-fixable issues:

```bash
bun run check:fix
```

Format code:

```bash
bun run format
```

### Preview

Preview the production build locally:

```bash
bun run preview
```
