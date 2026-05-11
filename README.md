## 🛠️ Database Setup (MySQL) Make sure you install mysql.
Follow these steps to connect the database to your local machine.
## Indvidual Test my Database 
## 1. Open Terminal and Login to MySQL
```bash
mysql -u root -p
Enter you Password: ?
## 2. Use the Database
USE taskmaster;
## 3. Exit MySQL
exit;
## 4. Run the Schema File
Navigate to the backend folder:
cd backend
## 5 Run the schema file: first navigate backend directory 
mysql -u root -p taskmaster < database/schema.sql



## Packages Install in the backend
npm install bcrypt jsonwebtoken
jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken
bcrypt: https://www.npmjs.com/package/bcrypt
## this is for security purposes. 

# 2. Have these reference files open:

# routes/auth.js (about to be wiped — note the structure first)
# config/db.js (so you remember how db.query works)
# package.json (to confirm bcrypt + jsonwebtoken are installed)
# .env (to confirm JWT_SECRET is there)

## Authentication System

TaskMaster uses JWT (JSON Web Tokens) for user authentication.

When a user signs up or logs in successfully:

- The backend generates a JWT token
- The token contains the user's ID and email
- The frontend stores the token
- Future requests send the token to protected backend routes

This allows the backend to:

- Verify authenticated users
- Protect private routes
- Associate tasks with the correct user
- Ensure users only access their own tasks
Passwords are securely hashed using bcrypt before storage in MySQL.

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=taskmaster

JWT_SECRET=your_jwt_secret
```

---

## Run the Backend

Inside the backend folder:

```bash
npm install
npm run dev
```

---

## Run the Frontend

Inside the frontend folder:

```bash
npm install
npm run dev
```

---

## Features

- User Signup/Login Authentication
- JWT Protected Routes
- Multi-User Task Isolation
- Create, Update, Delete Tasks
- Due Date Filtering
- Overdue Task Detection
- Persistent Login Sessions
- MySQL Database Integration
- Responsive User Interface

---

## Technologies Used

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database
- MySQL