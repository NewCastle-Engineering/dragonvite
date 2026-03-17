# Dragonvite Frontend

React + Vite + TypeScript + Material UI frontend application.

## Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start dev server (port 5173)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Scripts

- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build production bundle
- `pnpm preview` - Preview production build
- `pnpm type-check` - Check TypeScript types
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page-level components
├── hooks/          # Custom React hooks (Socket.io, queries, etc.)
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
├── utils/          # Utility functions (API client, helpers)
├── config/         # Configuration (theme, environment)
├── main.tsx        # Entry point
└── App.tsx         # Root component
```

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Material UI** - Component library
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Socket.io Client** - Real-time communication
- **React Konva** - Canvas rendering
- **Vitest** - Unit testing
- **Playwright** - E2E testing
- **Storybook** - Component documentation

## Environment Variables

See `.env.example` for all available variables.

```bash
# Copy example and update if needed
cp .env.example .env.local
```

## Notes

- API proxy configured in `vite.config.ts` - `/api/*` routes to backend
- Socket.io auto-connects via `useSocket()` hook (optional, add to App as needed)
- Material UI theme configured in `src/config/theme.ts`
- TypeScript path aliases configured for clean imports
