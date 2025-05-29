# Money Tracker - Expense Tracking Application

## Overview

Money Tracker is a comprehensive expense tracking application built with React that helps users manage their finances by tracking income, expenses, and savings. The application provides visual analytics and categorization features to give users insights into their spending habits.

## Features

- **User Authentication**: Secure login and registration system
- **Expense Tracking**: Add, edit, and delete financial transactions
- **Categorization**: Categorize transactions as income/savings or expenses
- **Financial Analytics**: View total balance, income, expenses, and percentage breakdowns
- **Filtering**: Filter transactions by category and date
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, React Router, Redux Toolkit
- **UI Components**: Material-UI, Bootstrap
- **State Management**: Redux
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Toastify

## Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd expenseTracker
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. The application will be available at `http://localhost:3000`

## Backend Setup

This application requires a backend server running at `http://localhost:8080/api/v1`. The backend should provide the following API endpoints:

- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /transection` - Create a new transaction
- `POST /gettransection` - Get transactions with filters
- `DELETE /deletetransection/:id` - Delete a transaction
- `PUT /updatetransection` - Update a transaction

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Dashboard**: View your financial summary and transaction history
3. **Add Transaction**: Click "New Budget" to add a new income or expense
4. **Edit/Delete**: Modify or remove existing transactions as needed
5. **Filter**: Use the category and date filters to analyze specific transactions

## Project Structure

```
├── public/                # Static files
└── src/                   # Source files
    ├── components/        # React components
    │   ├── Analytics.jsx  # Financial analytics component
    │   ├── Body.jsx       # Main content component
    │   ├── Home.jsx       # Home page component
    │   ├── Login.jsx      # Login component
    │   ├── Navbar.jsx     # Navigation component
    │   └── Register.js    # Registration component
    ├── redux/             # Redux state management
    │   ├── reducer.jsx    # Redux reducers
    │   └── store.js       # Redux store configuration
    ├── App.js             # Main application component
    └── index.js           # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
