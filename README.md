## 🛠️ Database Setup (MySQL)
Follow these steps to connect the database to your local machine.
## 1. Open Terminal and Login to MySQL
```bash
mysql -u root -p
Enter you Password: ?
## 2. Create the Database
CREATE DATABASE taskmaster;
## 3. Use the Database
USE taskmaster;
## 4. Exit MySQL
exit;
## 5. Run the Schema File
Navigate to the backend folder:
cd backend
## 6 Run the schema file:
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
- The token contains the user's ID
- The frontend stores the token
- Future requests send the token to protected backend routes

This allows the backend to:

- Verify authenticated users
- Protect private routes
- Associate tasks with the correct user
- Ensure users only access their own tasks

Passwords are securely hashed using bcrypt before storage in MySQL.