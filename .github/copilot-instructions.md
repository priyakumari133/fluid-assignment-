## Project Overview

**Task Board** is a full-stack web app for task management now combined into a single unified application:
- **Frontend**: React 18 + Vite + Tailwind CSS → built to `client/dist/` 
- **Backend**: Express.js → serves React build + REST API
- **Deployment**: Single server on port `3001` handles both frontend and API
- **Data**: No database; all tasks live in a `tasks` array in memory and are lost on server restart

### Architecture: Combined Frontend & Backend

Instead of two separate processes, the app now uses:
1. **Build Phase**: React app is built to static files (`client/dist/`)
2. **Runtime**: Single Express server serves:
   - Static React files (frontend)
   - `/api/*` routes (task management API)
   - Catch-all route to support SPA routing (returns `index.html`)

### Key Files

| File | Purpose |
|------|---------|
| `server/server.js` | Express server: serves static files + all API routes; in-memory `tasks` array |
| `client/src/App.jsx` | App state, task fetching, API integration (uses `const API_URL = '/api'` relative path) |
| `client/src/components/` | **TaskForm**, **TaskItem**, **ProgressBar**, **TaskList** (unchanged) |
| `client/vite.config.js` | Frontend build config (no proxy needed) |
| `client/dist/` | Built React app (created by `npm run build`) |
| `package.json` (root) | Unified scripts: `dev:client`, `dev:server`, `build:all`, `start` |
| `COMBINED_SETUP.md` | Detailed guide on the combined architecture |

## Architecture

**Single Express server** serving both frontend and API:
1. Frontend (React) is **built** to static files in `client/dist/`
2. Express server on port `3001` serves:
   - Static files from `client/dist/` (the React app)
   - `/api/*` routes (task management endpoints)
   - Catch-all route (`app.get('*')`) that serves `index.html` for SPA routing

**API URL resolution** (client-side):
- Simple relative path: `const API_URL = '/api'` in `App.jsx`
- Works seamlessly because frontend and API are on the same server
- No CORS needed; no Vite proxy needed

**Why This Works**:
- Express middleware: `app.use(express.static(path.join(__dirname, '../client/dist')))`
- Catch-all route ensures React Router handles client-side navigation
- All `/api/*` requests are handled by Express route handlers before the catch-all

## Developer Workflows

### Installation
From repo root:
```bash
npm run install:all  # Installs root, client/, and server/ deps
```

Or individually:
```bash
cd server && npm install
cd ../client && npm install
```

### Local Development (Two Terminals - Optional for Hot Reload)
```bash
# Terminal 1 (Frontend - port 3000 with Vite dev server)
npm run dev:client    # Vite dev server with hot reload

# Terminal 2 (Backend - port 3001)
npm run dev:server    # Express server
```
**Access at**: http://localhost:3000
- React changes hot-reload
- Relative API calls `/api/*` are internally handled by Vite

### Production Mode (Unified - Single Server)
```bash
npm run build:all    # Install + build React to client/dist/
npm start            # Start unified server on port 3001
```
**Access at**: http://localhost:3001
- Serves both frontend and API from single port
- No hot reload (production ready)

### Build Frontend Only
```bash
npm run build        # Outputs to client/dist/
```

### Common Commands

| Command | What It Does |
|---------|--------------|
| `npm run install:all` | Install dependencies for root, client/, server/ |
| `npm run dev:client` | Start Vite dev server (port 3000, hot reload) |
| `npm run dev:server` | Start Express server (port 3001) |
| `npm run build` | Build React to `client/dist/` |
| `npm run build:all` | Clean install + build React for production |
| `npm start` | Build React + start unified server (port 3001) |
| `npm run dev` | Alternative: build React + start server |

## Data Model & API Contracts

### Task Schema
All tasks follow this shape (in-memory array `tasks` in `server/server.js`, line 9):
```javascript
{
  id: number,           // Auto-incremented (taskId counter at line 10)
  title: string,        // Required, trimmed, non-empty validation
  completed: boolean,   // Default false
  createdAt: Date       // ISO timestamp
}
```

### API Endpoints (from `server/server.js`)

| Method | Route | Request Body | Response | Notes |
|--------|-------|--------------|----------|-------|
| GET | `/api/tasks` | — | `Task[]` | Returns all tasks |
| POST | `/api/tasks` | `{ title: string }` | `Task` (201) | Validates title non-empty; auto-generates id |
| PUT | `/api/tasks/:id` | `{ completed?: bool, title?: string }` | `Task` | Partial update; returns 404 if not found |
| DELETE | `/api/tasks/:id` | — | `Task` | Returns deleted task; 404 if not found |
| GET | `/health` | — | `{ status: "ok" }` | Health check (not used by client) |

### Client API Integration (`client/src/App.jsx`)
- Uses **axios** for all HTTP calls (lines 22–54)
- API base URL: Simple relative path `'/api'` (line 8)
- No environment variables needed (works on same server)
- State management: `tasks` array + `loading` flag in `App.jsx` (lines 11–12)
- Each async operation (`addTask`, `toggleTask`, `deleteTask`) updates local state after API success

## Component Patterns & Conventions

### Prop & Callback Structure
All task-affecting components use a **callback-based** pattern for API calls:

- **TaskForm** (`client/src/components/TaskForm.jsx`):
  - Props: `onAddTask(title: string) => Promise<Task>`
  - Local state: `input` (text), `isLoading` (async flag)
  - Behavior: clears input on success; disables input during loading

- **TaskItem** (`client/src/components/TaskItem.jsx`):
  - Props: `task`, `onToggle(id, completed) => Promise<void>`, `onDelete(id) => Promise<void>`
  - Local state: `isDeleting` flag
  - Behavior: visual feedback (strikethrough when completed, color change)

- **TaskList** (`client/src/components/TaskList.jsx`):
  - Props: `tasks`, `onToggle`, `onDelete`
  - Responsibility: mapping and rendering `TaskItem` components; empty state handling

- **ProgressBar** (`client/src/components/ProgressBar.jsx`):
  - Props: `completed` (count), `total` (count), `progress` (percentage)
  - Pure presentation; calculated in `App.jsx` (line 49)

### Styling Convention
- **Tailwind CSS** (utility-first): all components use Tailwind classes
- **Gradient design**: button and title use `bg-gradient-to-r`, accent colors (blue/purple)
- **State-based styles**: completed tasks get `bg-gradient-to-r from-green-50 to-emerald-50`
- **Disabled states**: input/button use `disabled:opacity-50` or similar; `isLoading`/`isDeleting` flags prevent multiple submissions

## Integration Points & Gotchas

### In-Memory Storage
- Backend uses an in-memory `tasks` array (line 10 in `server/server.js`)
- **All data is lost on server restart** — for persistent features, migrate to a database (SQLite, PostgreSQL, etc.)
- No transactions or data validation beyond title non-empty check

### Static File Serving & SPA Routing
- Backend: `app.use(express.static(path.join(__dirname, '../client/dist')))` serves React build
- Catch-all route: `app.get('*')` returns `index.html` for client-side routing
- Critical order: API routes (`/api/*`) must be defined BEFORE catch-all route
- If routes are reversed, `/api/tasks` would return `index.html` instead of JSON

### No CORS Needed
- Frontend and backend are now on the same server
- All requests are same-origin: `http://localhost:3001/api/*`
- No CORS headers required (removed from `server.js`)
- Simplifies deployment and reduces configuration

### Port Configuration
- Backend: `process.env.PORT || 3001` (`server/server.js` line 78)
- Frontend dev: hardcoded to port `3000` in `client/vite.config.js` line 7
- For production: only one port needed (3001 serves both)

### Common Issues During Development
1. **API 404 errors**: In dev mode, confirm BOTH `npm run dev:server` (port 3001) and `npm run dev:client` (port 3000) are running
2. **404 on frontend routes**: Make sure catch-all route is after all API routes (not before)
3. **Old content showing in production**: Delete `client/dist/` and rebuild: `rm -rf client/dist && npm run build`
4. **Cannot POST /api/tasks**: Verify server is running and headers match (Content-Type: application/json)

## Modifying & Extending

### Adding Persistence
- Centralize DB initialization under `server/` (e.g., `server/db.js`)
- Update `server/server.js` routes to query/mutate database instead of the `tasks` array
- Consider migrating to SQLite for local dev, PostgreSQL for production

### Changing API Paths
- Update `client/src/App.jsx` (lines 20–54 where axios calls are made)
- Keep `VITE_API_URL` environment variable with fallback (current pattern at line 6)
- Test via browser Network tab to verify client reaches updated endpoints

### Adding New Components
- Follow callback pattern: pass `onAction(args) => Promise<void>` props from `App.jsx`
- Use local `isLoading` or `isDeleting` flags for UI feedback during async operations
- Use Tailwind for styling; reference existing components for gradient/state-based patterns

## Testing & Debugging

- **Server logs**: check terminal running `npm run dev:server` for request logs and validation errors
- **Browser Network tab**: inspect axios requests to verify full URLs and response payloads
- **Frontend console**: check for axios error logs with detailed error messages
- **Health check**: `curl http://localhost:3001/health` to verify backend is responding
