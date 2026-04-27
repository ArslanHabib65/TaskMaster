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


