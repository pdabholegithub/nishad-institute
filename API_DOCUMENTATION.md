# Nishad Institute - API Documentation

This document provides a comprehensive overview of the APIs available in the **Nishad Institute** website project. The project utilizes a hybrid architecture of **Next.js API Routes** (for external/client-side calls) and **Server Actions** (for internal application logic).

---

## 1. Authentication
The project uses **NextAuth.js** for identity management.

- **Endpoint**: `/api/auth/[...nextauth]`
- **Mechanism**: Supports credentials-based login and session management.
- **Provider**: Credentials (Email/Password).

---

## 2. REST API Routes (`src/app/api`)

These endpoints are used for dynamic features like AI chat, payments, and course management.

### AI Chat Assistant
- **Endpoint**: `/api/chat`
- **Method**: `POST`
- **Payload**: `{ messages: [ { role: "user", content: "string" } ] }`
- **Logic**: 
  1. Primary: Google Gemini 1.5 Flash.
  2. Failover: Groq (Llama 3.1).
  3. Fallback: Local Knowledge Base (`data/knowledge-base.json`).

### Courses Management
- **Endpoint**: `/api/courses`
- **Methods**: 
  - `GET`: Returns list of courses. Supports `?level=Beginner` filter.
  - `POST`: Creates a new course. (Requires `title` and `price`).
- **Endpoint**: `/api/courses/[id]`
- **Methods**: `GET`, `PUT`, `DELETE`.

### Enrollment
- **Endpoint**: `/api/enroll`
- **Method**: `POST`
- **Payload**: `{ courseId: "string" }`
- **Logic**: Automatically finds the next available batch and creates a pending enrollment for the logged-in student.

### Payments (Razorpay)
- **Endpoint**: `/api/razorpay/create-order`
- **Method**: `POST`
- **Purpose**: Generates a Razorpay Order ID for checkout.
- **Endpoint**: `/api/razorpay/verify`
- **Method**: `POST`
- **Purpose**: Verifies the cryptographic signature of a successful payment.

---

## 3. Server Actions (`src/lib/actions.ts`)

Server Actions are asynchronous functions that run on the server but are called directly from React components.

| Action Name | Purpose | Parameters |
| :--- | :--- | :--- |
| `registerUser` | Signs up a new student. | `name`, `email`, `password` |
| `authenticate` | Logs in a user and redirects based on role (`/admin` or `/student`). | `email`, `password` |
| `createCourse` | Adds a new course to the database. | `FormData` (includes Security PIN) |
| `updateCourse` | Modifies an existing course. | `FormData` |
| `deleteCourse` | Removes a course. | `courseId`, `securityPin` |
| `createBatch` | Schedules a new batch for a course. | `name`, `startDate`, `courseId` |
| `enrollStudent` | Manually links a student to a batch. | `studentId`, `batchId` |
| `updatePaymentStatus`| Updates enrollment status (PENDING/PAID). | `enrollmentId`, `paymentStatus` |
| `logout` | Ends the current session. | None |

---

## 4. Security Mechanism
- **Session Protection**: Most APIs (like `/api/enroll`) check for a valid session using `auth()`.
- **Admin PIN**: Critical actions (Course creation/deletion) require a `securityPin` passed in the `FormData`, which is verified against the `ADMIN_SECURITY_PIN` environment variable.

---

## 5. Development Utilities
The project includes a utility file **`src/lib/api-utils.ts`** that standardizes API responses:
- `successResponse(data, status, meta)`
- `errorResponse(message, status, errorType)`
- `withErrorHandler(fn)`: A wrapper that catches database errors and returns formatted JSON.
