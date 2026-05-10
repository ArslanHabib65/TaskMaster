const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');

router.post('/signup',  async (req, res)=> {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Invalid email and password'});
    }
    const normalizedEmail = email.toLowerCase();
    // email should be look like email. email check that it has domain or not. 
    const domainChecker = email.split("@");
    if (domainChecker.length !== 2){
        return res.status(400).json({message: "Enter a valid email"});
    }
    const uniqueLetter = ['!', '@', '#', '$', '%', '^', '&', '*'];
    const hasUniqueChar = uniqueLetter.some(char => password.includes(char));
    if (password.length < 6){
        return res.status(400).json({message: "Password must have at least 6 characters"});
    }
    if (!hasUniqueChar){
        return res.status(400).json({message: "Password must have at least 1 special character."});
    }
    try{
        const hashPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (email, password_hash) VALUES (?,?)';
        const [result] = await db.query(sql, [normalizedEmail, hashPassword])
        console.log(result.insertId);
        const token = jwt.sign(
            {userId: result.insertId, email: normalizedEmail},
            process.env.JWT_SECRET, 
            {expiresIn: '3d'}
        );
        res.status(201).json({message: 'Account successfully Created', Token: token, userId: result.insertId});
    } catch(error){
        if (error.code === 'ER_DUP_ENTRY'){
            // 409 bad request  
            res.status(409).json({message: "Email already exist"});
        } else {
             // 500 server error
            res.status(500).json({message: error.message});
        }
    }  
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const sql = 'SELECT * FROM users WHERE email = ?';

    try {

        const [row] = await db.query(sql, [normalizedEmail]);

        if (row.length === 0){
            return res.status(401).json({
                message: 'Invalid email and password'
            });
        }

        const user = row[0];

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordMatch){
            return res.status(401).json({
                message: 'Invalid email and password'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,  email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '3d'
            }
        );

        return res.status(200).json({
            message: 'Successfully Login',
            token: token,
            userId: user.id
        });

    } catch (error){

        console.error(error);

        return res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;