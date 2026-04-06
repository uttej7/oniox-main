# OrionX — IT Service Management Platform

A modern, beautiful ITSM web application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Demo Login

| Email | Password | Role |
|-------|----------|------|
| admin@orionx.com | Admin@123 | Administrator |
| abinash@orionx.com | Admin@123 | IT Manager |

## 📁 Project Structure

```
orionx-app/
├── app/                        # Next.js App Router
│   ├── (auth)/login/           # Login page (public route)
│   ├── (dashboard)/            # Protected dashboard routes
│   │   ├── layout.tsx          # Dashboard shell (sidebar + header + footer)
│   │   ├── dashboard/          # Home dashboard with stats
│   │   ├── it/                 # IT management (incidents, requests, catalog, assets)
│   │   ├── employee/           # Employee directory
│   │   ├── employee-center/    # Self-service portal
│   │   ├── vendors/            # Vendor management
│   │   ├── user-groups/        # User groups & roles
│   │   ├── change-request/     # Change management
│   │   ├── employee-onboarding/
│   │   └── employee-offboarding/
│   ├── globals.css
│   ├── layout.tsx              # Root layout with AuthProvider
│   └── page.tsx                # Redirects to /dashboard
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Collapsible sidebar with nested items
│   │   ├── Header.tsx          # Top header with search, notifications, profile
│   │   └── Footer.tsx          # Copyright footer
│   └── ui/
│       ├── StatsCard.tsx       # Metric display card
│       ├── PageHeader.tsx      # Consistent page titles
│       └── ComingSoon.tsx      # Placeholder for in-dev pages
├── context/
│   └── AuthContext.tsx         # Auth state management (React Context)
├── data/
│   └── sidebarItems.json       # ← Sidebar config (integrate with backend here)
├── lib/
│   ├── auth.ts                 # Auth utilities (swap for real API here)
│   └── utils.ts                # Helper functions (cn, getInitials)
├── middleware.ts               # Route protection (checks auth cookie)
└── public/
    └── logo.svg                # OrionX logo
```

## 🔧 Connecting to a Backend

### Authentication
Edit `lib/auth.ts` → `validateCredentials()` to call your API:
```ts
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials),
});
if (!response.ok) return null;
return response.json(); // Returns { id, name, email, role, avatar }
```

### Sidebar Menu Items
Edit `data/sidebarItems.json` to add, remove, or nest menu items. Each item supports:
- `id` — unique identifier
- `label` — display name
- `icon` — Lucide icon name
- `path` — URL path
- `badge` — optional badge text (e.g., notification count)
- `children` — nested sub-items (supports one level of nesting)

## 🎨 Design System

- **Primary color:** `#02114f` (deep navy)
- **Font:** Inter
- **Icons:** Lucide React
- **Components:** Custom Tailwind CSS

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) icons

## 📱 Responsive Design

- **Desktop:** Persistent sidebar + full header
- **Mobile/Tablet:** Collapsible sidebar via hamburger menu, overlay backdrop
