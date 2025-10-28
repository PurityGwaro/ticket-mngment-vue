# Tickify - Ticket Management System

A modern, responsive ticket management web application built with Vue 3.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Official routing library
- **Composition API** - Modern Vue state management
- **Composables** - Reusable stateful logic (useAuth, useTickets)
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Toastification** - Toast notifications
- **Vite** - Next-generation frontend build tool
- **UUID** - Unique ID generation

## Setup & Installation

```bash
npm install

npm run dev

npm run build

npm run preview
```

## Test Credentials

**Demo Account:**
- Email: `demo@test.com`
- Password: `password123`

Or create a new account - authentication is simulated using localStorage.

## Features

- **Landing Page** - Hero section with gradient background, animated blobs, and feature cards
- **Authentication** - Tab-based login/signup with form validation
- **Dashboard** - Overview statistics (Total, Open, In Progress, Closed tickets) with quick actions
- **Ticket Management** - Full CRUD operations with real-time validation
- **Edit Modal** - Slide-out panel for editing tickets
- **Responsive Design** - Mobile-first, optimized for all screen sizes
- **Protected Routes** - Navigation guards with automatic redirects
- **Toast Notifications** - Success/error feedback for all actions

## Project Structure

```
src/
├── views/            # Page components (Home, Dashboard, Tickets, etc.)
├── components/       # Reusable UI components
│   ├── layout/      # Header, Footer
│   └── tickets/     # Ticket-specific components
├── composables/      # Vue composables (useAuth, useTickets)
├── router/           # Vue Router configuration
├── utils/            # Utility functions
├── App.vue           # Root component
├── main.js           # Application entry point
└── style.css         # Global styles
```

## Status Values

- `open` - Green badge
- `in_progress` - Yellow badge
- `closed` - Gray badge

## Priority Values

- `low` - Green badge
- `medium` - Orange badge
- `high` - Red badge

## Accessibility

- Semantic HTML elements
- Keyboard navigation support
- ARIA labels where needed
- Sufficient color contrast
- Focus states on interactive elements
- Screen reader friendly

## State & Session Management

**State Management:**
- `useAuth` composable - Manages user authentication state
- `useTickets` composable - Manages ticket data and CRUD operations

**LocalStorage Keys:**
- Users: `Tickify_users`
- Current User: `Tickify_current_user`
- Tickets: `tickets`

**Route Guards:**
- Protected routes require authentication
- Guest routes (landing, auth) redirect to dashboard if logged in
- Automatic redirect to `/auth` for unauthenticated users

Logout clears the session and redirects to the landing page.

## Vue 3 Features Used

- **Composition API** - `<script setup>` syntax
- **Reactive State** - `ref()`, `computed()`
- **Lifecycle Hooks** - `onMounted()`
- **Composables** - Reusable stateful logic
- **Vue Router** - Declarative routing with navigation guards
- **Component Props & Emits** - Type-safe component communication

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
