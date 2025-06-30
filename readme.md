# Expense Tracker

A full-stack web application to track your income and expenses, visualize your financial data, and manage your personal budget.

## Features

- User authentication (sign up, login, JWT-based sessions)
- Add, edit, and delete income and expense records
- Upload and manage profile images
- Dashboard with charts (pie, bar, line) for financial overview
- Download income/expense data as Excel files
- Responsive, modern UI built with React and Tailwind CSS
- RESTful API built with Node.js, Express, and MongoDB

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts, Axios
- **Backend:** Node.js, Express, Mongoose, Multer, JWT
- **Database:** MongoDB Atlas


### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Backend setup:**
   ```sh
   cd backend
   npm install
   # Create a .env file with your MongoDB URI and JWT secret
   cp .env.example .env
   npm start
   ```

3. **Frontend setup:**
   ```sh
   cd ../frontend/Expense-Tracker
   npm install
   npm run dev
   ```

4. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Folder Structure

```
backend/
  controllers/
  middleware/
  models/
  routes/
  config/
  uploads/
frontend/Expense-Tracker/
  src/
    components/
    pages/
    context/
    hooks/
    utils/
```

## Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

## API Endpoints

- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/dashboard` - Get dashboard data
- `POST /api/v1/income` - Add income
- `POST /api/v1/expense` - Add expense
- ...and more (see routes for details)

## License

MIT
