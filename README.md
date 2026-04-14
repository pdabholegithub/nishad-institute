# 🎓 Nishad Institute Solutions

A professional, full-stack management platform for IT training institutes. Built with **Next.js 14**, **Prisma**, and **NextAuth v5**, this platform provides a seamless experience for administrators to manage courses, batches, and students, while giving students a centralized place to track their learning journey.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpdabholegithub%2Fnishad-institute)

## 📸 Screenshots

### 🌐 Public Landing Page
![Landing Page](public/screenshots/landing.png)

### 🔐 Secure Student Portal
![Login Page](public/screenshots/login.png)

## ✨ Features

### 🏢 Administrator Command Center
- **Real-time Analytics**: Dynamic dashboard showing student enrollment metrics, active batches, and revenue tracking.
- **Course & Batch Management**: Full CRUD functionality to create and manage the institute's course catalog and upcoming cohorts.
- **Student CRM**: Manage student profiles, track payment statuses, and enroll students in any batch with a single click.

### 👩‍🎓 Student Learning Portal
- **Dashboard**: personalized view of active courses and learning progress.
- **Schedule tracking**: Professional 7-day calendar view of upcoming live sessions and batches.
- **Assignments**: Track upcoming and submitted tasks per course.
- **Profile**: Full record of enrollment history and academic standing.

### 🏠 Public Marketing Site
- **Dynamic Catalog**: Automatically updates based on the courses added in the admin panel.
- **Lead Capture**: Functional contact form for new student inquiries and demo class requests.
- **SEO Optimized**: Built for performance and discoverability.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite with Prisma ORM
- **Authentication**: Auth.js (NextAuth v5) with Bcrypt
- **Styling**: Tailwind CSS & Lucide Icons
- **Components**: Reusable, modern UI components with framer-motion animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / pnpm / yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pdabholegithub/nishad-institute.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file in the root.
   - Add `AUTH_SECRET="your-secret-here"`
   - Add `DATABASE_URL="file:./dev.db"`
4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## 🔑 Demo Credentials
- **Admin**: `admin@nishad.com` / `password123`
- **Student**: `student@nishad.com` / `password123`

---
*Built for Nishad IT Solutions.*
