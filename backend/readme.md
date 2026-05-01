# Zavia — Backend

The backend is a Node.js/Express REST API server with real-time Socket.IO support. It handles authentication, mentor management, job board operations, video session coordination, AI-powered resume parsing, and file storage.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Middleware](#middleware)
- [Real-time Events](#real-time-events)
- [Utilities](#utilities)
- [Scripts](#scripts)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | HTTP server and routing |
| MongoDB + Mongoose | Database and ODM |
| Socket.IO 4 | Real-time WebSocket communication |
| JSON Web Tokens | Stateless authentication |
| bcrypt | Password hashing |
| Cloudinary | Cloud file/image storage |
| Multer | Multipart file upload handling |
| Google Gemini API | AI-powered resume parsing |
| pdf-parse / pdfjs-dist | PDF text extraction |
| Morgan | HTTP request logging |
| dotenv | Environment variable management |
| nodemon | Development auto-restart |

---

## Project Structure

```
backend/
├── config/
│   ├── cloudinary.js       # Cloudinary SDK initialisation
│   └── multer.js           # Multer disk/memory storage config
│
├── controller/
│   └── socketManager.js    # Socket.IO room and peer management
│
├── middlewares/
│   ├── asyncWrap.js        # Async error wrapper
│   ├── upload.js           # Multer upload middleware
│   ├── verifyAdmin.js      # Admin role guard
│   └── verifyToken.js      # JWT authentication guard
│
├── models/
│   ├── jobModel.js         # Job listing schema
│   ├── mentorModel.js      # Mentor profile schema
│   ├── reviewModel.js      # Session review schema
│   ├── sessionModel.js     # Mentoring session schema
│   └── userModel.js        # User account schema
│
├── routes/
│   ├── admin.routes.js     # Recruiter/admin operations
│   ├── chat.routes.js      # AI chatbot endpoints
│   ├── job.routes.js       # Job board CRUD
│   ├── mentor.routes.js    # Mentor discovery
│   ├── session.routes.js   # Session booking and management
│   └── user.routes.js      # User auth and profile
│
├── utils/
│   ├── resumeParser.js     # PDF extraction + Gemini AI parsing
│   └── uploadToCloudinary.js # Cloudinary upload helper
│
├── .gitignore
├── index.js                # Application entry point
├── package.json
└── readme.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- A running MongoDB instance (local or MongoDB Atlas)
- Cloudinary account credentials
- Google Gemini API key

### Installation

```bash
cd backend
npm install
```

### Run in Development

```bash
npm run dev
```

Starts the server with `nodemon` — the server auto-restarts on file changes.

### Run in Production

```bash
npm start
```

The server will start on the port defined in `PORT` (default: `8080`).

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=8080

# Database
DB_URL=mongodb://localhost:27017/zavia

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

---

## API Reference

### Root

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | None | Returns 3 featured mentors and 3 recent jobs |
| `GET` | `/verifyToken` | Bearer Token | Validates a JWT and returns the decoded user |

---

### User Routes — `/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/user/register` | None | Register a new user account |
| `POST` | `/user/login` | None | Login and receive a JWT |
| `POST` | `/user/forgotPassword` | None | Initiate password reset |
| `GET` | `/user/profile` | Bearer Token | Get the authenticated user's profile |
| `PUT` | `/user/profile` | Bearer Token | Update profile fields |
| `POST` | `/user/resume` | Bearer Token | Upload a PDF resume to Cloudinary |
| `POST` | `/user/resume/parse` | Bearer Token | AI-parse uploaded resume and populate profile |
| `GET` | `/user/applications` | Bearer Token | List the user's job applications |
| `POST` | `/user/savedJobs/:jobId` | Bearer Token | Save a job to favourites |
| `DELETE` | `/user/savedJobs/:jobId` | Bearer Token | Remove a saved job |

---

### Mentor Routes — `/mentor`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/mentor` | None | List all approved mentors |
| `GET` | `/mentor/:id` | None | Get a mentor's full profile |
| `POST` | `/mentor/apply` | Bearer Token | Submit a mentor application |
| `PUT` | `/mentor/:id` | Bearer Token | Update mentor profile |

---

### Admin / Recruiter Routes — `/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/admin/subscribe` | Bearer Token | Upgrade account to recruiter role |
| `GET` | `/admin/dashboard` | Bearer Token | Recruiter dashboard (jobs + applicants KPIs) |
| `GET` | `/admin/mentors/pending` | Admin Token | List pending mentor applications |
| `PUT` | `/admin/mentors/:id/approve` | Admin Token | Approve a mentor application |
| `PUT` | `/admin/mentors/:id/reject` | Admin Token | Reject a mentor application |
| `GET` | `/admin/users` | Admin Token | List all users |

---

### Session Routes — `/session`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/session/book` | Bearer Token | Book a mentoring session |
| `GET` | `/session/my` | Bearer Token | List sessions for the logged-in user |
| `GET` | `/session/:id` | Bearer Token | Get a single session's details |
| `PUT` | `/session/:id/status` | Bearer Token | Update session status |
| `POST` | `/session/:id/feedback` | Bearer Token | Submit session feedback/review |

---

### Job Routes — `/jobs`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/jobs` | None | List all job postings |
| `GET` | `/jobs/:id` | None | Get a single job's details |
| `POST` | `/jobs` | Admin Token | Create a new job posting |
| `PUT` | `/jobs/:id` | Admin Token | Update a job posting |
| `DELETE` | `/jobs/:id` | Admin Token | Delete a job posting |
| `POST` | `/jobs/:id/apply` | Bearer Token | Apply for a job |
| `GET` | `/jobs/:id/applications` | Admin Token | List applicants for a job |
| `PUT` | `/jobs/:id/applications/:userId` | Admin Token | Update an applicant's status |

---

### Chat Routes — `/chat`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/chat` | Bearer Token | Send a message to the AI chatbot |

---

## Data Models

### User

```
name, email, password, profileImage, role (mentee|mentor|admin)
headline, location, bio
skills[], experience[], education[], projects[]
resume { url, public_id }
jobPreferences { roles[], locations[], salaryRange, remoteOnly }
applications[], savedJobs[]
profileCompletion, isEmailVerified
```

### Mentor

```
userId (ref: User), name, bio, country, state, city
profileImg, language[], skills[]
meetingCharge, availability, status
linkedInURL, gender, highestEducation
workExperience, currentJob, socialMediaLinks[]
```

### Job

```
title, company, location, description, requirements[]
salary, jobType, remote, postedBy (ref: User)
applicants[{ user, status, appliedAt }]
views, deadline
```

### Session

```
mentorId (ref: Mentor), menteeId (ref: User)
date, time, status, meetingLink, notes
```

### Review

```
sessionId, mentorId, menteeId
rating, comment
```

---

## Middleware

| File | Purpose |
|---|---|
| `verifyToken.js` | Decodes and validates the JWT from `Authorization: Bearer <token>`. Attaches `req.user`. |
| `verifyAdmin.js` | Checks that `req.user.role === "admin"`. Must be used after `verifyToken`. |
| `upload.js` | Multer middleware configured for memory storage (passes file buffer to Cloudinary). |
| `asyncWrap.js` | Wraps async route handlers to automatically forward errors to Express error handler. |

---

## Real-time Events (Socket.IO)

The server manages WebRTC signalling for 1-on-1 video calls via `controller/socketManager.js`.

| Event | Direction | Description |
|---|---|---|
| `join:room` | Client → Server | Join a call room with a PeerJS peer ID |
| `user:joined` | Server → Client | Notifies existing room members of a new peer |
| `user:left` | Server → Client | Notifies room members when a peer disconnects |
| `disconnect` | Client → Server | Handles cleanup on socket disconnect |

---

## Utilities

### `resumeParser.js`

1. Extracts raw text from an uploaded PDF using `pdfjs-dist`
2. Sends the extracted text to Google Gemini with a structured prompt
3. Maps the Gemini response to the User schema fields
4. Returns structured profile data ready for a database update

### `uploadToCloudinary.js`

A helper that accepts a file buffer and upload options, calls the Cloudinary upload API, and returns the `{ url, public_id }` result.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start server with nodemon (development) |
| `npm start` | Start server with node (production) |