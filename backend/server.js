const express = require('express');
const cors = require('cors');
require('dotenv').config();

// import routes
const taskRoutes = require('./routes/tasks.js');
const authRoutes = require('./routes/auth');

// iniialize DB connectin (jsut by importing - the connect() run immdeialty)
require('./config/db.js');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// checking backend running
app.get('/', (req, res) =>{
    res.send('TaskMaster is running!');
});


// Mount routes 
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

// Start server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {                         
    console.log(`Server is running on port ${PORT}`);
});