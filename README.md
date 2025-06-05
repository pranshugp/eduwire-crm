# Eduwire CRM

Eduwire CRM is a full-stack web application for managing student leads, counsellors, and admin operations for educational consultancies.

## Project Structure

```
.vscode/
Backend/
Frontend/
```

- **Backend/**: Node.js, Express, MongoDB (Mongoose)
- **Frontend/**: React, Redux Toolkit, Tailwind CSS

---

## Backend

### Setup

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env` and set your MongoDB URI and JWT secret.

3. **Start the server:**
   ```sh
   npm start
   ```
   The server runs on `http://localhost:5000` by default.

### Main Features

- User authentication (JWT)
- Role-based access: admin, counsellor, student
- Lead management (CRUD)
- CSV export for leads
- RESTful API endpoints

### Key Endpoints

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/leads` — Get all leads (admin)
- `GET /api/leads/mine` — Get counsellor's leads
- `POST /api/leads` — Create lead
- `PUT /api/leads/:id` — Update lead
- `PUT /api/leads/:id/request-edit` — Student requests edit
- `GET /api/export/csv` — Export leads as CSV (admin)

---

## Frontend

### Setup

1. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```

2. **Configure environment variables:**
   - Edit `.env` to set `REACT_APP_API_URL` to your backend API.

3. **Start the development server:**
   ```sh
   npm start
   ```
   The app runs on `http://localhost:3000` by default.

### Main Features

- Login/Register (role-based)
- Dashboard for admin, counsellor, student
- Lead creation, editing, and viewing
- Counsellor management (admin)
- Profile management (student)
- Responsive UI with Tailwind CSS

---

## Usage

- **Admin**: Manage all leads, assign counsellors, export CSV, manage users.
- **Counsellor**: View and manage assigned leads, add new leads.
- **Student**: View and edit profile, request lead edits.

---

## Development

- **Backend**: [Backend/](Backend/)
- **Frontend**: [Frontend/](Frontend/)

---

## License

MIT

---

## Author

Sumaiya 
Pranshu