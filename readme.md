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
   git clone https://github.com/AbhisekDas01/Expense-Tracker-App-MERN.git
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

### -> Backend
```
├── config
│   ├── db.js
│   └── env.js
├── controllers
│   ├── auth.controller.js
│   ├── dashboard.controller.js
│   ├── expense.controller.js
│   └── income.controller.js
├── middleware
│   ├── auth.middleware.js
│   └── upload.middleware.js
├── models
│   ├── expense.model.js
│   ├── income.model.js
│   └── user.model.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.route.js
│   ├── dashboard.route.js
│   ├── expense.route.js
│   └── income.route.js
├── server.js
└── uploads
```

### -> Frontend
```
Expense-Tracker
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.jsx
│   ├── assets
│   │   ├── images
│   │   │   └── card2.png
│   │   ├── logo.svg
│   │   └── react.svg
│   ├── components
│   │   ├── Cards
│   │   │   ├── CharAvatar.jsx
│   │   │   ├── InfoCard.jsx
│   │   │   └── TransactionInfoCard.jsx
│   │   ├── Charts
│   │   │   ├── CustomBarChart.jsx
│   │   │   ├── CustomLegend.jsx
│   │   │   ├── CustomLineChart.jsx
│   │   │   ├── CustomPieChart.jsx
│   │   │   └── CustomToolTip.jsx
│   │   ├── Dashboard
│   │   │   ├── ExpenseTransactions.jsx
│   │   │   ├── FinanceOverview.jsx
│   │   │   ├── Last30DaysExpenses.jsx
│   │   │   ├── RecentIncome.jsx
│   │   │   ├── RecentIncomeWithChart.jsx
│   │   │   └── RecentTransactions.jsx
│   │   ├── DeleteAlert.jsx
│   │   ├── EmojiPickerPopup.jsx
│   │   ├── Expense
│   │   │   ├── AddExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── ExpenseOverview.jsx
│   │   ├── Income
│   │   │   ├── AddIncomeForm.jsx
│   │   │   ├── IncomeList.jsx
│   │   │   └── IncomeOverview.jsx
│   │   ├── Inputs
│   │   │   ├── Input.jsx
│   │   │   └── ProfilePhotoSelector.jsx
│   │   ├── Modal.jsx
│   │   └── layouts
│   │       ├── AuthLayout.jsx
│   │       ├── DashboardLayout.jsx
│   │       ├── Navbar.jsx
│   │       └── SideMenu.jsx
│   ├── context
│   │   └── userContext.jsx
│   ├── hooks
│   │   └── useUserAuth.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── Auth
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   └── Dashboard
│   │       ├── Expense.jsx
│   │       ├── Home.jsx
│   │       └── Income.jsx
│   └── utils
│       ├── apiPaths.js
│       ├── axiosInstance.js
│       ├── data.js
│       ├── helper.js
│       └── uploadImage.js
└── vite.config.js
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

