# Zavia — Admin Panel

The Admin Panel is a standalone React web application for platform administrators. It provides a dedicated interface for reviewing mentor applications, approving or rejecting mentor profiles, and managing platform content — separate from the main user-facing Frontend.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Features](#features)
- [Component Guide](#component-guide)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool and dev server |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 | Utility-first styling |
| Axios | HTTP client for backend API calls |
| Lucide React | Icon library |

---

## Project Structure

```
admin/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── MentorRow.jsx       # Table row component for a single mentor entry
│   │   └── SideBar.jsx         # Navigation sidebar with links
│   │
│   ├── lib/
│   │   └── sampleData.js       # Static sample/mock data for development
│   │
│   ├── pages/
│   │   ├── DummyPage.jsx       # Placeholder page for unimplemented routes
│   │   ├── MentorDetail.jsx    # Full detail view for a pending mentor
│   │   └── PendingMentors.jsx  # Table of mentors awaiting approval
│   │
│   ├── App.css
│   ├── App.jsx                 # Root component — Router + Sidebar + page outlets
│   ├── index.css
│   └── main.jsx                # React entry point
│
├── index.html
├── package.json
├── eslint.config.js
├── vite.config.js
└── vercel.json                 # Vercel deployment config (SPA fallback)
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- The backend server running and accessible (see `backend/README.md`)
- An admin-role user account created via the backend

### Installation

```bash
cd admin
npm install
```

### Run in Development

```bash
npm run dev
```

The admin panel starts at `http://localhost:5174` by default (Vite auto-assigns the next available port if 5173 is in use by the Frontend).

---

## Environment Variables

Create a `.env` file in the `admin/` directory:

```env
VITE_API_URL=http://localhost:8080
```

Use this variable in API calls:

```js
const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/mentors/pending`, {
  headers: { Authorization: `Bearer ${token}` }
});
```

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `PendingMentors` | Lists all mentors with `status: "pending"` awaiting review |
| `/pending-mentors/:id` | `MentorDetail` | Full profile view of a single pending mentor with approve/reject actions |
| `/pending/:id` | `MentorDetail` | Alternate path for mentor detail (same component) |
| `*` | `DummyPage` | Catch-all placeholder for routes not yet implemented |

All routes are rendered inside the persistent `Sidebar` layout defined in `App.jsx`.

---

## Features

### Pending Mentor Queue
The main view (`PendingMentors`) fetches all mentor applications that have not yet been approved or rejected. Each row is rendered as a `MentorRow` component displaying the mentor's name, skills, current job, and a link to their detailed profile.

### Mentor Detail & Approval
The `MentorDetail` page displays all information submitted in the mentor application:

- Personal info: name, bio, location, gender, languages
- Professional info: current job, work experience, highest education
- Skills and meeting charge
- LinkedIn and social media links
- Profile image (loaded from Cloudinary)

Admins can **Approve** or **Reject** the application from this page. Both actions call the backend admin routes and update the mentor's `status` field in the database.

### Sidebar Navigation
The `SideBar` component provides persistent navigation across the admin panel. It links to the pending mentors queue and any future admin pages that are added.

---

## Component Guide

### `App.jsx`

Sets up `BrowserRouter` with a flex layout: the `Sidebar` is always visible on the left, and the matched `Route` renders in the main content area on the right.

```jsx
<div className='flex min-h-screen bg-gray-50'>
  <Router>
    <Sidebar />
    <main className="flex-1 p-6">
      <Routes>...</Routes>
    </main>
  </Router>
</div>
```

### `SideBar.jsx`

A vertical navigation panel with styled links built using React Router's `<Link>` component and Tailwind CSS. Add new navigation items here as the admin panel grows.

### `MentorRow.jsx`

A table row (`<tr>`) component that displays a mentor's summary info and a "View Details" link. Designed to be rendered inside the table in `PendingMentors`.

### `MentorDetail.jsx`

Fetches the full mentor document from `GET /admin/mentors/:id` on mount. Calls `PUT /admin/mentors/:id/approve` or `PUT /admin/mentors/:id/reject` on button click and redirects back to the pending list on success.

### `DummyPage.jsx`

A simple placeholder component rendered for catch-all routes (`*`). Replace this with real page components as new features are built.

### `sampleData.js` (`src/lib/`)

Contains hardcoded sample mentor objects used for UI development and testing when the backend is unavailable. This data is not used in production API calls.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production (`dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

The project includes a `vercel.json` for SPA routing on Vercel:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy:
1. Connect the `admin/` directory to a separate Vercel project (or use a subdirectory deployment).
2. Set `VITE_API_URL` in the Vercel environment variables to point to your production backend.
3. Restrict access to the admin panel URL to authorized personnel — there is currently no client-side login screen; authentication is handled by including a valid admin JWT in API request headers.

> **Security Note:** Consider adding a login screen to the admin panel so that only users with valid admin credentials can access it, rather than relying solely on backend route guards.