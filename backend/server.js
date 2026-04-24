// Importing all required libraries from node_modules
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// creating the server with express
const app = express();

//middleware
app.use(cors()); // Allows frontend (different port) to make requests to this backend.
app.use(express.json()); // Lets the server read/parse JSON data coming in from requests (like from Postman or the frontend).

// get method to run the backend on localhost.
app.get('/', (req, res) => {
    res.send('TaskMaster  is running!');
});

// Databse Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log('Database connected failed:', err);
        return;
    }
    console.log('MySQL Database Connected');
});


// post new row in database . 
app.post('/tasks', (req, res) => {
    const { title, description, priority, done, dueDate} = req.body;
    const sql = 'INSERT INTO tasks (title, description, priority, done, dueDate) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, priority, done, dueDate];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json({message: 'Task Added Successfully!', id: result.insertId});
    });

});

// GET all tasks from the database
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});

// get one task from database
app.get('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM tasks WHERE id = ?';
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err){
            return res.status(500).json({error: err.message});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Task not found'});
        }

        res.json(result[0]);
    })
});

// put (update) task by id
app.put('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const { title, description, priority, done, dueDate} = req.body;
    const sql = 'UPDATE tasks SET title = ?, description = ?, priority = ?, done = ?, dueDate =? WHERE id = ?';
    const values = [title, description, priority, done, dueDate, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        // check that any row data being change 
        if (result.affectedRows === 0){
            return res.status(400).json({message: 'TASK NOT FOUND'})
        }
        res.json({message: 'Task Updated successfully!'});
    });
});


// Delete an Task by id
app.delete('/tasks/:id', (req, res) => {
    const {id } = req.params;

    const sql = 'DELETE FROM tasks WHERE id = ?';
    const value = [id];

    db.query(sql, value, (err, result) => {
        if (err){
            return res.status(500).json({error: err.message});
        } 
        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'TASK NOT FOUND'});
        }
        res.json({message: 'Task Successfully deleted'});
    });
});



// running localhost server. 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});