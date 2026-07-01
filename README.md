# Student Expense Tracker with Authentication

A simple, responsive, and clean Full-Stack Expense Tracker application built using React (Vite), Node.js, Express, PostgreSQL, and Prisma ORM.

This application is designed specifically for an internship evaluation, showcasing clean and modular code, basic registration/login authentication, database relations, and user-scoped CRUD actions.

---

## Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Routing**: React Router DOM (Layout routes, private route guards)
- **Styling**: Plain CSS (No Tailwind, Bootstrap, Sass or CSS frameworks)
- **HTTP Client**: Native browser **`fetch()` API** (No Axios)
- **Icons**: React Icons (Feather Icons pack)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Auth Hashing**: `bcryptjs`
- **Request Logger**: Morgan (development mode)

### Database & ORM
- **Database**: PostgreSQL
- **ORM**: Prisma ORM

---

## Features

1. **Authentication**: Simple Login and Registration pages. Password hashing via `bcryptjs` on the backend. User session state persisted locally via `localStorage`.
2. **User-Scoped Expenses**: Users can only view, create, edit, or delete **their own expenses**. The logged-in user's ID is stored alongside their expense log in the PostgreSQL table.
3. **Simplified Dashboard**:
   - **Total Expenses** displayed in Indian Rupees (**₹**)
   - **Total Transactions** logged by the user
4. **Expense List**: Custom plain-CSS table showing Title, Category, Amount (₹), Date, and Description.
5. **Predefined Categories**: Simple dropdown selects containing **Food, Travel, Shopping, Bills, Entertainment, Other**.
6. **Confirmation Modal**: A clean dialog box prompting confirmation before deleting any expense.

---

## Setup & Running Guide

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v20+ recommended)
- **npm** (v10+)
- **PostgreSQL** (running locally on port 5432)

---

### Step 1: Database Configuration

1. Open the backend configuration file `backend/.env`.
2. Ensure the `DATABASE_URL` matches your local database credentials:
   ```env
   DATABASE_URL="postgresql://postgres:password%402026@localhost:5432/demopost?schema=public"
   ```
   *Note: Since the password contains the character `@`, it must be URL-encoded as `%40` inside the connection string.*

---

### Step 2: Set Up Backend

1. Open your terminal in the `backend/` folder and run:
   ```bash
   npm install
   ```
2. Reset the database and apply the updated user relationship tables:
   ```bash
   npx prisma db push --force-reset
   ```
3. Seed the database with sample users and expense logs:
   ```bash
   npx prisma db seed
   ```
   *(This registers two users: `user1` and `user2` with the password `password123`)*
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run at **http://localhost:5000**.

---

### Step 3: Set Up Frontend

1. Open a new terminal in the `frontend/` folder and run:
   ```bash
   npm install
   ```
2. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
   The React web client will run at **http://localhost:5173**. Open this URL in your web browser.

---

## REST API Documentation

### Authentication (`/api/auth`)
- **POST `/api/auth/register`**: Registers a new user. Hashes the password.
- **POST `/api/auth/login`**: Authenticates user credentials. Returns user `{ id, username }` payload.

### Expenses (`/api/expenses`) - *Protected by auth middleware*
All requests must pass the header `'x-user-id': <logged_in_user_id>` to authorize.
- **GET `/api/expenses`**: Returns all expenses belonging **only** to the authorized user.
- **POST `/api/expenses`**: Log a new expense. Links the authorized user's ID to the record.
- **PUT `/api/expenses/:id`**: Edit an existing expense. Verifies that the expense belongs to the user first.
- **DELETE `/api/expenses/:id`**: Permanently deletes an expense belonging to the authorized user.

---

## Code Quality Highlights

- **Protect Middleware**: Enforces authorization checks before any expense API queries are handled, preventing cross-user data leakage.
- **Axios-Free Frontend**: Uses browser-standard `fetch` calls, which keeps frontend assets lightweight and simple to explain.
- **Prisma Client Relation**: Maps User and Expense tables cleanly, cascading deletions of expenses when user profiles are deleted.
