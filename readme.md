# Zavia — Career & Mentorship Platform

Zavia is a full-stack career development platform that connects job seekers with industry mentors, enables real-time video sessions, provides AI-powered resume parsing, and offers a job board — all in one ecosystem.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Zavia is built as a multi-application monorepo with four distinct sub-projects:

| Sub-project | Description |
|---|---|
| `backend/` | Node.js/Express REST API + Socket.IO server |
| `Frontend/` | React web application (user-facing) |
| `admin/` | React admin panel for mentor approval workflows |
| `zavia/` | React Native / Expo mobile app |

---

## Project Structure

```
Zavia-main/
├── backend/                # Express API server
│   ├── config/             # Cloudinary & Multer configuration
│   ├── controller/         # Socket.IO manager
│   ├── middlewares/        # Auth, upload, admin verification
│   ├── models/             # Mongoose schemas
│   ├── routes/             # REST API route handlers
│   └── utils/              # Resume parser, Cloudinary uploader
│
├── Frontend/               # React web app (Vite + Tailwind)
│   └── src/
│       ├── admin/          # Admin UI components (recruiter view)
│       ├── Chat/           # AI chatbot
│       ├── components/     # Shared components (Header, Footer, etc.)
│       ├── context/        # Socket context provider
│       ├── dashboard/      # Mentor dashboard
│       ├── explore/        # Browse mentors
│       ├── Forms/          # Mentor registration & edit forms
│       ├── job/            # Job board pages
│       ├── landing/        # Landing page sections
│       ├── profile/        # User & mentor profile pages
│       ├── register/       # Auth pages (login, register)
│       ├── skeleton/       # Loading skeleton components
│       └── VideoCall/      # WebRTC video call UI
│
├── admin/                  # Standalone React admin panel (Vite + Tailwind)
│   └── src/
│       ├── components/     # Sidebar, MentorRow
│       ├── lib/            # Sample data
│       └── pages/          # Pending mentors, mentor detail
│
└── zavia/                  # React Native mobile app (Expo)
    ├── app/
    │   ├── (app)/          # Authenticated screens (home, explore, profile, jobs)
    │   └── (auth)/         # Login & register screens
    ├── components/         # Shared native components
    ├── constants/          # Theme tokens
    ├── hooks/              # Color scheme hooks
    └── src/
        ├── api/            # API client (authApi)
        └── context/        # Auth context
```

---

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │            Clients                  │
                    │                                     │
           ┌────────┴────────┐         ┌─────────────────┴──────┐
           │  Frontend (Web) │         │  Zavia (Mobile / Expo) │
           │  React + Vite   │         │  React Native + Expo   │
           └────────┬────────┘         └─────────────────┬──────┘
                    │                                     │
           ┌────────┴─────────────────────────────────────┴──────┐
           │               Admin Panel (Web)                     │
           │               React + Vite                          │
           └────────────────────────┬───────────────────────────┘
                                    │ REST API / Socket.IO
                    ┌───────────────▼───────────────┐
                    │          Backend               │
                    │   Node.js + Express + Socket.IO│
                    └───────────────┬───────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
     ┌────────▼──────┐   ┌──────────▼───────┐   ┌────────▼────────┐
     │   MongoDB     │   │   Cloudinary     │   │  Google Gemini  │
     │  (Mongoose)   │   │  (File Storage)  │   │  (AI / Resume)  │
     └───────────────┘   └──────────────────┘   └─────────────────┘
```

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose)
- **Real-time:** Socket.IO
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **File Storage:** Cloudinary + Multer
- **AI:** Google Gemini API (resume parsing)
- **Logging:** Morgan

### Frontend (Web)
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **HTTP Client:** Axios
- **Real-time:** Socket.IO Client
- **Video Calls:** PeerJS (WebRTC)

### Admin Panel
- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **HTTP Client:** Axios

### Mobile (Zavia)
- **Framework:** React Native 0.81 + Expo 54
- **Navigation:** Expo Router 6 + React Navigation
- **Language:** TypeScript
- **HTTP Client:** Axios
- **Storage:** Expo Secure Store (JWT persistence)

---

## Features

- **Mentor Discovery** — Browse and filter industry mentors by skills, location, and availability
- **1-on-1 Video Sessions** — WebRTC-powered video calls with in-call chat sidebar
- **AI Resume Parser** — Upload a PDF resume; Gemini AI extracts and auto-fills your profile
- **Job Board** — Post and apply for jobs; recruiter dashboard with applicant tracking
- **AI Chatbot** — Built-in career guidance chatbot
- **Role System** — Three roles: `mentee`, `mentor`, and `admin`
- **Mentor Approval Workflow** — Admins review and approve mentor applications
- **Feedback & Reviews** — Session-based feedback forms
- **Mobile App** — Native iOS/Android experience via Expo

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or Atlas)
- Cloudinary account
- Google Gemini API key

### Clone the repo

```bash
git clone https://github.com/your-org/Zavia.git
cd Zavia
```

### Start each sub-project

```bash
# 1. Backend
cd backend
npm install
npm run dev

# 2. Frontend (Web)
cd ../Frontend
npm install
npm run dev

# 3. Admin Panel
cd ../admin
npm install
npm run dev

# 4. Mobile App
cd ../zavia
npm install
npx expo start
```

---

## Environment Variables

Each sub-project requires its own `.env` file. See each sub-project's README for the full list.

### Backend (`backend/.env`)

```env
PORT=8080
DB_URL=mongodb://localhost:27017/zavia
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_key
```

### Frontend / Admin (`Frontend/.env`, `admin/.env`)

```env
VITE_API_URL=http://localhost:8080
```

### Mobile (`zavia/.env`)

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
```

---

## API Overview

The backend exposes the following route groups:

| Prefix | Description |
|---|---|
| `GET /` | Homepage — featured mentors and jobs |
| `GET /verifyToken` | Token validation |
| `/user` | User auth, profile management, resume upload |
| `/mentor` | Mentor discovery and profile |
| `/admin` | Admin/recruiter dashboard, job management |
| `/session` | Book and manage mentoring sessions |
| `/chat` | AI chatbot endpoints |
| `/jobs` | Job board CRUD and applications |

Full route documentation is available in the [Backend README](./backend/README.md).

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow conventional commit messages and ensure your changes are tested before opening a PR.

---

## License

This project is licensed under the ISC License. See [LICENSE](./LICENSE) for details.