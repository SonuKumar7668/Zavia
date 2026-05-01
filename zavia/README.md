# Zavia — Mobile App

The `zavia` folder contains the React Native / Expo mobile application for the Zavia platform. It provides native iOS and Android experiences for job seekers, including job discovery, mentor exploration, user profile management, and authentication — all backed by the same REST API as the web Frontend.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Screens & Navigation](#screens--navigation)
- [Key Features](#key-features)
- [Authentication Flow](#authentication-flow)
- [Theming](#theming)
- [Scripts](#scripts)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native 0.81 | Cross-platform native UI |
| Expo 54 | Managed workflow, build tooling, native APIs |
| Expo Router 6 | File-based routing for React Native |
| TypeScript | Type safety across the app |
| React Navigation (Bottom Tabs) | Tab bar navigation |
| Axios | HTTP client for API requests |
| Expo Secure Store | Secure JWT token storage on device |
| Expo Font | Custom font loading |
| Expo Haptics | Haptic feedback on interactions |
| Expo Image | Optimised image loading |
| Expo Splash Screen | Splash screen management |
| React Native Reanimated | Smooth animations |
| React Native Gesture Handler | Gesture recognition |
| Lucide React Native | Icon library |

---

## Project Structure

```
zavia/
├── app/                        # Expo Router file-based routes
│   ├── _layout.tsx             # Root layout (auth state gate)
│   ├── index.tsx               # Entry redirect (auth → app or auth screens)
│   │
│   ├── (app)/                  # Authenticated app screens
│   │   ├── _layout.tsx         # Bottom tab navigator layout
│   │   ├── index.tsx           # Default tab redirect
│   │   ├── home.tsx            # Home screen (featured jobs + categories)
│   │   ├── explore.tsx         # Browse mentors screen
│   │   ├── profile.tsx         # User profile screen
│   │   └── job/
│   │       └── [id].tsx        # Dynamic job detail screen
│   │
│   └── (auth)/                 # Unauthenticated screens
│       ├── _layout.tsx         # Auth stack layout
│       ├── login.tsx           # Login screen
│       └── register.tsx        # Registration screen
│
├── assets/
│   └── images/                 # App icons, splash screens, logos
│
├── components/                 # Shared React Native components
│   ├── external-link.tsx       # Pressable link that opens browser
│   ├── haptic-tab.tsx          # Tab bar button with haptic feedback
│   ├── hello-wave.tsx          # Animated waving hand component
│   ├── parallax-scroll-view.tsx # Scroll view with parallax header
│   ├── themed-text.tsx         # Text with theme-aware colour
│   ├── themed-view.tsx         # View with theme-aware background
│   └── ui/
│       ├── collapsible.tsx     # Expandable/collapsible section
│       ├── icon-symbol.tsx     # Cross-platform icon component
│       └── icon-symbol.ios.tsx # iOS-specific SF Symbol icons
│
├── constants/
│   └── theme.ts                # Design tokens (colours, spacing, typography)
│
├── hooks/
│   ├── use-color-scheme.ts     # Native color scheme hook
│   ├── use-color-scheme.web.ts # Web-specific color scheme hook
│   └── use-theme-color.ts      # Returns correct color from theme for light/dark
│
├── scripts/
│   └── reset-project.js        # Script to reset app to blank Expo starter
│
├── src/
│   ├── api/
│   │   └── authApi.js          # API client functions (login, register, jobs)
│   │
│   └── context/
│       └── AuthContext.js      # Auth state: user, token, login, logout
│
├── app.json                    # Expo app configuration (name, icons, scheme)
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- For iOS: macOS with Xcode installed
- For Android: Android Studio with an emulator, or a physical device with Expo Go

### Installation

```bash
cd zavia
npm install
```

### Run the App

```bash
# Start Expo development server
npm start

# Open on Android emulator
npm run android

# Open on iOS simulator (macOS only)
npm run ios

# Open in browser (web preview)
npm run web
```

After running `npm start`, scan the QR code with the **Expo Go** app on your physical device, or press `a` for Android / `i` for iOS to open in the respective simulator.

---

## Environment Variables

Expo uses the `EXPO_PUBLIC_` prefix for environment variables that are bundled into the app.

Create a `.env` file in the `zavia/` directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:8080
```

Access in code:

```ts
const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

> **Note:** For a physical device, replace `localhost` with your machine's local IP address (e.g., `http://192.168.1.100:8080`) so the device can reach the backend server on your network.

---

## Screens & Navigation

### Navigation Structure

```
Root Layout (_layout.tsx)
└── AuthContext gate
    ├── (auth) Stack — shown when NOT logged in
    │   ├── login.tsx
    │   └── register.tsx
    │
    └── (app) Bottom Tabs — shown when logged in
        ├── home.tsx          (Home tab)
        ├── explore.tsx       (Explore tab)
        ├── profile.tsx       (Profile tab)
        └── job/[id].tsx      (Dynamic, no tab — navigated to from Home)
```

### Screen Descriptions

| Screen | Route | Description |
|---|---|---|
| Login | `/(auth)/login` | Email + password login form. Stores JWT in Expo Secure Store on success. |
| Register | `/(auth)/register` | New account registration with name, email, and password. |
| Home | `/(app)/home` | Hero section, job category chips, and a featured jobs list fetched from the API. |
| Explore | `/(app)/explore` | Browse all approved mentors. Displays mentor cards with skills, location, and meeting charge. |
| Profile | `/(app)/profile` | Displays the authenticated user's profile info, skills, experience, education, and applied jobs. |
| Job Detail | `/(app)/job/[id]` | Full job description, requirements, salary, and an Apply button. |

---

## Key Features

### File-based Routing with Expo Router
Routes are defined by the file structure inside `app/`. Parenthesized directories like `(app)` and `(auth)` are route groups — they define layouts without contributing to the URL path.

### Secure Token Storage
JWTs are stored using **Expo Secure Store**, which uses the device's secure enclave (Keychain on iOS, Keystore on Android). This is significantly more secure than `AsyncStorage`.

### Dark/Light Mode Support
The app supports system-level dark and light themes. `use-color-scheme.ts` reads the device's color scheme, and `use-theme-color.ts` maps token names from `constants/theme.ts` to the correct color value for the current mode. `ThemedText` and `ThemedView` apply this automatically.

### Haptic Feedback
The `HapticTab` component wraps tab bar buttons with `expo-haptics`, providing tactile feedback on iOS devices when switching tabs.

### Parallax Scroll View
`ParallaxScrollView` provides a scroll container with a collapsing header image that moves at a different speed from the content — used on screens with a hero image.

### Category Chips (Home)
The Home screen renders a horizontal scrollable row of job category chips (Frontend, Backend, UI/UX, Data Science, Mobile, DevOps) for quick filtering.

---

## Authentication Flow

```
App Launch
    │
    ▼
Root _layout.tsx
    │
    ├── Read token from Expo Secure Store
    │
    ├── Token found → navigate to /(app)/home
    │
    └── No token → navigate to /(auth)/login
                          │
                          ▼
                   Login / Register
                          │
                          ▼
               POST /user/login or /user/register
                          │
                          ▼
               Store JWT in Expo Secure Store
               Update AuthContext { user, token }
                          │
                          ▼
               Navigate to /(app)/home

Logout:
    Clear Secure Store → clear AuthContext → navigate to /(auth)/login
```

---

## Theming

`constants/theme.ts` defines the design tokens used across the app:

```ts
// Example structure
export const Colors = {
  light: {
    background: '#ffffff',
    text: '#11181C',
    tint: '#0a7ea4',
    ...
  },
  dark: {
    background: '#151718',
    text: '#ECEDEE',
    tint: '#fff',
    ...
  }
};
```

Use `useThemeColor` hook to access the correct value:

```ts
const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
```

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo development server |
| `npm run android` | Open on Android emulator/device |
| `npm run ios` | Open on iOS simulator (macOS only) |
| `npm run web` | Open in browser (web preview) |
| `npm run lint` | Run ESLint via `expo lint` |
| `npm run reset-project` | Reset app back to a blank Expo starter template |

---

## Building for Production

Use **EAS Build** (Expo Application Services) for production builds:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for Android (APK or AAB)
eas build --platform android

# Build for iOS (IPA)
eas build --platform ios
```

Refer to the [Expo EAS Build documentation](https://docs.expo.dev/build/introduction/) for code signing and submission to the App Store / Google Play.