# ✈️ StajNet- Next Gen (V2)

A modern, full-stack recruitment and internship management platform built for the Tunisian airline industry. This application facilitates the entire lifecycle of an internship: from browsing offers and submitting applications to technical assessments and workshop scheduling.

![Status](https://img.shields.io/badge/Status-Beta-orange)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![UI](https://img.shields.io/badge/Style-Shadcn-black)

## 🚀 Technology Stack (The "2025 Stack")

This project was refactored from a legacy CRA architecture to a modern, performance-first stack.

### Frontend
- **Build Tool:** [Vite](https://vitejs.dev/) (Instant server start)
- **Framework:** [React 18](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Library:** [Shadcn/UI](https://ui.shadcn.com/) (Built on Radix Primitives)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Page transitions & micro-interactions)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Global Auth State)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) (Caching & Synchronization)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Schema Validation)
- **Icons:** [Lucide React](https://lucide.dev/)

### Backend (Existing)
- **Runtime:** Node.js / Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (JSON Web Tokens)

---

## 🛠 Features by Role

### 👨‍🎓 Candidate (Intern)
- **Landing Page:** Modern parallax hero section with live statistics counters.
- **Offer Browsing:** Filterable list of available internships with detailed modals.
- **Application System:** Secure file upload (Resume/CV) via FormData.
- **Status Tracking:** Real-time dashboard to track application status (Pending, Approved, Rejected).
- **Technical Assessment:** Integrated Quiz Runner with progress tracking and auto-grading.

### 👮‍♂️ Supervisor
- **Intern Roster:** View cards of all assigned interns with contact details.
- **Workshop Management:** Schedule training sessions.
- **Smart Scheduler:** Interactive modal to select attendees from the approved intern pool.

### 👑 Administrator
- **Executive Dashboard:** Charts and graphs visualizing application trends.
- **Offer Management:** Create, Edit, and Delete internship positions.
- **Application Review:** Accept or Reject candidates.
- **User Management:** Role-Based Access Control (RBAC) to create Supervisors and Admins.
- **Quiz Builder:** Dynamic form to attach technical questions to specific offers.

---

## 📂 Project Structure

The project follows a **Feature-Based Architecture** for scalability.

```text
src/
├── assets/              # Static images and SVGs
├── components/
│   ├── layout/          # Navbar, Sidebar, DashboardLayout
│   ├── shared/          # ProtectedRoute, PageContainer, Loaders
│   └── ui/              # Reusable Shadcn components (Button, Card, Input...)
├── features/            # Business Logic Components
│   ├── applications/    # ApplicationForm, StatusBadge
│   ├── internships/     # OfferList, CreateOfferDialog
│   ├── workshops/       # WorkshopScheduler, AttendeeSelector
│   └── users/           # UserTables, ProfileForms
├── hooks/               # Custom React Hooks
├── lib/                 # Utilities (Axios instance, Tailwind merger)
├── pages/               # Page Views (Assembled features)
│   ├── dashboard/       # Admin, Intern, and Supervisor views
│   └── public/          # Home, Login, Register
├── services/            # API Call definitions
└── store/               # Zustand Global Store (Auth)
⚡ Getting Started
Prerequisites

    Node.js (v16 or higher)

    MongoDB (Local or Atlas)

1. Backend Setup

Navigate to the backend folder and start the server.
code Bash

    
cd Back
npm install
# Create a .env file with: MONGODB_URI=... and JWT_SECRET=...
npm start

  

Server runs on port 4890.
2. Frontend Setup

Navigate to the V2 frontend folder.
code Bash

    
cd tunisiar-recrute-v2
npm install
npm run dev

  

Client runs on port 5173.
🎨 Design System

    Primary Color: Tunisair Red (#D6001C)

    Typography:

        Headings: Lexend (Modern, geometric)

        Body: Inter (Clean, readable)

    Visuals: Glassmorphism effects, rounded cards, and smooth spring animations.



© 2025 Tunisair Recrute. All rights reserved.