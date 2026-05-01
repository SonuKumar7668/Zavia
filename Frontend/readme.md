# Zavia — Frontend (Web)

The Frontend is the primary user-facing web application for the Zavia platform. Built with React 19 and Vite, it provides the full user journey: landing page, mentor discovery, video sessions, job board, AI chatbot, and profile management.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Key Features](#key-features)
- [Component Guide](#component-guide)
- [State & Context](#state--context)
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
| Axios | HTTP client for API calls |
| Socket.IO Client | Real-time events (video call signalling) |
| PeerJS | WebRTC peer-to-peer video calls |
| JWT Decode | Decode tokens on the client |
| React Slick + Swiper | Carousel/slider components |
| React Markdown + remark-gfm | Render AI chatbot responses |
| Lucide React | Icon set |
| dayjs | Date formatting |

---

## Project Structure

```
Frontend/
├── public/
│   └── vite.svg
│
├── src/
│   ├── admin/                  # Recruiter-facing admin UI (embedded in main app)
│   │   ├── AdminDashboard.jsx  # KPI dashboard for recruiters
│   │   ├── Applications.jsx    # View applicants for a specific job
│   │   ├── CreateJob.jsx       # Form to post a new job
│   │   ├── EditJob.jsx         # Form to edit an existing job
│   │   ├── ManageJobs.jsx      # Job listing management table
│   │   └── ManageUsers.jsx     # User management table
│   │
│   ├── Chat/
│   │   └── ChatBot.jsx         # AI chatbot full-page interface
│   │
│   ├── components/             # Shared layout and UI components
│   │   ├── AdminLayout.jsx     # Outlet layout for admin routes
│   │   ├── AdminRoutes.jsx     # Protected route wrapper (role: admin)
│   │   ├── BecomeRecruiter.jsx # Subscription/upgrade page
│   │   ├── ChatbotLink.jsx     # Floating chatbot button
│   │   ├── FeaturesMentors.jsx # Featured mentors section
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Header.jsx          # Navigation header (auth-aware)
│   │   ├── MentorCard.jsx      # Mentor listing card
│   │   ├── MentorSlider.jsx    # Horizontal scrolling mentor list
│   │   ├── ProfileCard.jsx     # Compact profile card
│   │   ├── SuccessStories.jsx  # Testimonials section
│   │   ├── Swiper.jsx          # Swiper carousel wrapper
│   │   └── WhyChooseUs.jsx     # Platform value-prop section
│   │
│   ├── context/
│   │   └── SocketProvider.jsx  # Socket.IO context for video calls
│   │
│   ├── dashboard/
│   │   ├── Dashboard.jsx       # Mentor dashboard overview
│   │   ├── MentorProfile.jsx   # Mentor's own profile view
│   │   └── SessionCard.jsx     # Session item in dashboard list
│   │
│   ├── explore/
│   │   └── Explore.jsx         # Browse all mentors with filters
│   │
│   ├── Forms/
│   │   ├── EditDashboard.jsx   # Mentor profile edit form (large, multi-section)
│   │   ├── FeedBackForm.jsx    # Post-session feedback form
│   │   └── MentorForm.jsx      # New mentor application form
│   │
│   ├── job/
│   │   ├── Applications.jsx    # User's job application history
│   │   ├── JobCard.jsx         # Single job card component
│   │   ├── JobCards.jsx        # Job card list renderer
│   │   ├── JobDetails.jsx      # Full job detail page
│   │   └── JobExplore.jsx      # Browse jobs with search and filters
│   │
│   ├── landing/
│   │   ├── AiCTA.jsx           # AI feature call-to-action section
│   │   ├── ExploreSection.jsx  # Mentor preview section on landing
│   │   ├── Features.jsx        # Platform features highlight
│   │   ├── Hero.jsx            # Hero banner
│   │   ├── HowItWorks.jsx      # Step-by-step explainer section
│   │   └── LandingPage.jsx     # Landing page composition
│   │
│   ├── profile/
│   │   ├── EditUserProfile.jsx # Job seeker profile edit form
│   │   ├── MentorProfile.jsx   # Public mentor profile view
│   │   ├── ProfilePage.jsx     # Profile page router/wrapper
│   │   ├── ResumeUpload.jsx    # Resume PDF upload component
│   │   ├── SessionCard.jsx     # Session item on profile page
│   │   └── UserProfile.jsx     # Full user profile display
│   │
│   ├── register/
│   │   ├── ForgotPassword.jsx  # Password reset flow
│   │   ├── Login.jsx           # Login form
│   │   └── Register.jsx        # Registration form
│   │
│   ├── skeleton/
│   │   ├── FeaturedMentor.jsx      # Skeleton for featured mentors
│   │   └── MentorCardSkeleton.jsx  # Skeleton for mentor card list
│   │
│   ├── VideoCall/
│   │   ├── CallControls.jsx    # Mute/camera/end-call controls
│   │   ├── ChatSidebar.jsx     # In-call text chat panel
│   │   ├── VideoCall.jsx       # Main video call component (WebRTC)
│   │   └── VideoTile.jsx       # Individual video feed tile
│   │
│   ├── App.css
│   ├── App.jsx                 # Root component with all routes
│   ├── index.css
│   ├── main.jsx                # React entry point
│   └── NotFound.jsx            # 404 page
│
├── index.html
├── package.json
├── vite.config.js
└── vercel.json                 # Vercel deployment config (SPA fallback)
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- The backend server running (see `backend/README.md`)

### Installation

```bash
cd Frontend
npm install
```

### Run in Development

```bash
npm run dev
```

The app starts at `http://localhost:5173` by default.

---

## Environment Variables

Create a `.env` file in the `Frontend/` directory:

```env
VITE_API_URL=http://localhost:8080
```

All environment variables must be prefixed with `VITE_` to be accessible in the browser via `import.meta.env`.

---

## Pages & Routes

| Route | Component | Protected | Description |
|---|---|---|---|
| `/` | `LandingPage` | No | Marketing landing page |
| `/login` | `Login` | No | User login |
| `/register` | `Register` | No | New user registration |
| `/forgotPassword` | `ForgotPassword` | No | Password reset |
| `/explore` | `Explore` | No | Browse all mentors |
| `/mentor/profile/:id` | `ProfilePage` | No | Public mentor profile |
| `/mentor/profile/edit/:id` | `EditDashboard` | Yes | Edit mentor profile |
| `/form` | `MentorForm` | Yes | Apply to become a mentor |
| `/dashboard/:id` | `Dashboard` | Yes | Mentor's personal dashboard |
| `/user/profile/:id` | `UserProfile` | Yes | Job seeker profile |
| `/user/profile/edit` | `EditUserProfile` | Yes | Edit job seeker profile |
| `/videocall/:id` | `VideoCall` | Yes | WebRTC video session |
| `/session/:id/feedback` | `FeedbackForm` | Yes | Post-session feedback |
| `/chat` | `Chatbot` | Yes | AI chatbot |
| `/jobs` | `JobsExplore` | No | Browse job board |
| `/jobs/:id` | `JobDetails` | No | Single job details |
| `/applications` | `ApplicationsPage` | Yes | User's job applications |
| `/become-recruiter` | `BecomeRecruiter` | Yes | Upgrade to recruiter plan |
| `/admin` | `AdminDashboard` | Admin only | Recruiter KPI dashboard |
| `/admin/jobs` | `ManageJobs` | Admin only | Manage job postings |
| `/admin/users` | `ManageUsers` | Admin only | Manage users |
| `/admin/jobs/create` | `CreateJob` | Admin only | Post a new job |
| `/admin/jobs/edit/:id` | `EditJob` | Admin only | Edit a job posting |
| `/admin/jobs/:id/applications` | `Applications` | Admin only | View job applicants |
| `*` | `NotFoundPage` | No | 404 fallback |

> The Header and Footer are hidden on `/videocall` and `/chat` routes for a focused experience.

---

## Key Features

### Video Calls (WebRTC + PeerJS)
Video sessions are initiated through PeerJS, which wraps WebRTC. The `SocketProvider` context establishes a Socket.IO connection used for room signalling. `VideoCall.jsx` handles peer connections, media streams, and renders `VideoTile` components for each participant. In-call text chat is available via the `ChatSidebar`.

### AI Chatbot
The chatbot at `/chat` sends user messages to the backend's `/chat` endpoint and renders the AI's responses using `react-markdown` with GitHub Flavored Markdown support.

### Resume Upload & AI Parsing
Users can upload a PDF resume from their profile page. The `ResumeUpload` component sends the file to the backend, which extracts text using `pdfjs-dist` and parses it with Google Gemini. The structured result auto-fills the user's profile fields.

### Admin Panel (Recruiter)
Admin-role users gain access to `/admin` routes, which are wrapped in `AdminRoute` (role guard). The embedded admin panel allows recruiters to post jobs, view applicants, and manage users.

### Skeleton Loaders
`MentorCardSkeleton` and `FeaturedMentor` skeleton components display while data is loading, preventing layout shift and improving perceived performance.

---

## Component Guide

### `Header.jsx`
Auth-aware navigation bar. Reads the JWT from local storage via `jwt-decode` to show the correct nav items based on user role (mentee, mentor, admin).

### `SocketProvider.jsx`
Creates and provides a Socket.IO client instance via React Context. Used only on pages that require real-time features (video call).

### `AdminRoutes.jsx`
A React Router wrapper component that checks if the decoded JWT has `role: "admin"`. Redirects unauthenticated or unauthorized users to `/login`.

### `MentorSlider.jsx`
A `react-slick` carousel displaying mentor cards horizontally with responsive breakpoints.

---

## State & Context

| Context | Location | Purpose |
|---|---|---|
| `SocketProvider` | `src/context/SocketProvider.jsx` | Provides a shared Socket.IO instance to the video call component tree |

Global auth state is managed by reading/writing JWTs to `localStorage` and decoding them client-side with `jwt-decode`.

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

The project includes a `vercel.json` that configures all routes to serve `index.html`, enabling SPA client-side routing on Vercel.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

To deploy: connect the `Frontend/` directory to a Vercel project and set `VITE_API_URL` in the Vercel environment variables.