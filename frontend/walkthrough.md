# Walkthrough - Simplified Full-Stack Expense Tracker with Auth (Plain Text Passwords)

We have successfully rebuilt the Full-Stack Expense Tracker application to conform with your updated student-level tech stack and authentication requirements, including storing passwords in plain text for easier evaluation.

---

## 1. Accomplishments

### Backend Auth & APIs (No Hashing)
- **Plain Text Authentication**: Removed `bcryptjs` completely. Passwords are saved directly as plain text in the PostgreSQL database for easier assessment.
- **Custom Auth Middleware**: Added `authMiddleware.js` checking `x-user-id` header to verify logins.
- **Auth REST Endpoints**:
  - `POST /api/auth/register` (Registers accounts, saves password in plain text)
  - `POST /api/auth/login` (Authenticates user by direct comparison `password === user.password`)
- **User-Specific Expense Scoping**: Filtered all CRUD controllers in `expenseController.js` by `userId: req.userId` to ensure data isolation.

### Prisma Schema Relationship
- Established a one-to-many relationship mapping `User` to `Expense` in `schema.prisma`.
- Configured cascading deletes: removing a user deletes all their expenses.
- Overwrote `seed.js` to register `user1` and `user2` (password: `password123` in plain text) and seed mock expenses linked to their respective IDs.

### Plain CSS Frontend
- **Removed CSS frameworks**: Pruned Tailwind CSS and PostCSS config files.
- **Separate CSS files**: Created standalone stylesheets inside `frontend/src/styles/` (`Login.css`, `Register.css`, `Dashboard.css`, `ExpenseForm.css`, `ExpenseTable.css`, `Navbar.css`, `Sidebar.css`, `App.css`).
- **Axios-Free**: Rewrote all API requests to use browser native `fetch()` calls.
- **Indian Rupee Format (₹)**: Replaced USD formatting with standard Rupees (₹).
- **Simplified Dashboard Layout**: Reduced the metric summaries down to `Total Expenses (₹)` and `Total Transactions` counters.
- **Predefined Dropdown Categories**: Enforced selection mapping to `Food, Travel, Shopping, Bills, Entertainment, Other`.

---

## 2. Verification & Testing

### Database Reset & Seeding
Using PowerShell, we wiped the tables and pushed the updated database client:
```bash
npx prisma db push --force-reset
npx prisma db seed
```
*Result*: Tables synced, `user1` and `user2` registered, and mock expenses linked to their database IDs.

### Hashed Password Check
We queried the database users table using:
```powershell
$env:PGPASSWORD='password@2026'; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d demopost -c "SELECT * FROM users;"
```
*Result*:
```text
 id | username |  password   |        createdAt        |        updatedAt        
----+----------+-------------+-------------------------+-------------------------
  3 | user1    | password123 | 2026-07-01 04:43:21.571 | 2026-07-01 04:43:21.571
  4 | user2    | password123 | 2026-07-01 04:43:21.612 | 2026-07-01 04:43:21.612
```
This confirms that the passwords are stored as plain text (`password123`) instead of hashed strings, making it easy to inspect.

### Production Compile Verification
Running the production build in the `frontend` directory verifies zero compile errors:
```bash
npm run build
```
*Result*: Completed successfully with zero warnings.
