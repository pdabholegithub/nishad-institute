# 🎓 Nishad Institute Solutions: Next-Gen EdTech Platform

A professional, full-stack management platform for IT training institutes. Built with **Next.js 14**, **Prisma**, and **NextAuth v5**, this platform provides a high-end experience for administrators, students, and prospective learners.

---

## 🚀 Key Features

### 🏠 High-Conversion Marketing Engine
- **Dynamic Course Catalog**: Automatically synced with the database.
- **Visual Curriculum Roadmaps**: Module-wise syllabus breakdown with progress visualization.
- **Free Study Vault**: Lead-generation section with downloadable cheat sheets and technical notes.
- **Urgency Drivers**: Live countdown timers for upcoming batches and "Summer 2026 Admissions" badges.
- **Social Proof**: Premium testimonials and "Hiring Partners" ticker.
- **AI-Powered Counselor**: 24/7 AI Chatbot integrated with Google Gemini for answering student queries.
- **One-Click Support**: Floating WhatsApp inquiry button for instant counseling.

### 💳 Integrated Payments & Enrollment
- **Razorpay Integration**: Fully functional checkout flow for course purchases.
- **Automated Onboarding**: Students are instantly enrolled and granted dashboard access upon successful payment.
- **Payment Verification**: Secure backend signature verification for all transactions.

### 👩‍🎓 Student Learning Ecosystem
- **Interactive Dashboard**: Personalized progress tracking and active course management.
- **Resource Center**: Access to course-specific notes, assignments, and mock test materials.
- **1-on-1 Support**: Integrated links for live Zoom sessions and mentoring.
- **Automated Certification**: (Roadmapped) Generate professional certificates upon course completion.

### 🏢 Administrator Control Center
- **Analytics Dashboard**: Real-time tracking of revenue, active students, and batch occupancy.
- **Content Management**: Effortlessly manage courses, batches, and curriculum data.
- **Student CRM**: Manage student statuses, payment records, and enrollment histories.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Production) / SQLite (Development) with Prisma ORM
- **Authentication**: Auth.js (NextAuth v5) with Bcrypt security
- **Payments**: Razorpay API
- **AI**: Google Gemini API (via AI Chat Assistant)
- **Styling**: Tailwind CSS (Custom Orange & Amber Theme)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS Micro-animations

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Razorpay Account (for payments)
- Google AI (Gemini) API Key (for chatbot)

### Installation
1. **Clone & Install**:
   ```bash
   git clone https://github.com/pdabholegithub/nishad-institute.git
   cd nishad-institute
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root and add:
   ```env
   # Auth
   AUTH_SECRET="your-secret-key"
   
   # Database
   DATABASE_URL="file:./dev.db" # Or your PostgreSQL URL
   
   # Payments (Razorpay)
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_SECRET="your_secret_..."
   
   # AI (Gemini)
   GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_key"
   ```

3. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js # Optional: Adds demo data
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 📖 How to Update Content

### 📑 Updating Course Syllabus
The detailed module roadmaps are stored in `src/data/courseModules.json`. To update a course curriculum:
1. Open the JSON file.
2. Find the `courseId` (matches the ID in your Database).
3. Add or modify the `modules` and `topics` arrays.

### 📅 Managing Batches
Batches appear on the homepage under "Upcoming Batches". These are pulled directly from the **Prisma `Batch` model**. You can manage them via the **Admin Dashboard** (`/admin/batches`) or by running:
```bash
npx prisma studio
```

---

## 🔐 Credentials (Demo)
- **Admin**: `admin@automationplayground.com` / `password123`
- **Student**: `student@automationplayground.com` / `password123`

---
*Developed for Automation Playground. Empowering IT Professionals Worldwide.*
