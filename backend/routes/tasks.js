const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware.js');

// POST a new task
router.post('/', authMiddleware ,async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        const userId = req.user.userId;
        if (!title || !dueDate) {
            return res.status(400).json({
                message: "Title and due date are required"
            });
        }

        const sql =
                    'INSERT INTO tasks (title, description, priority, done, dueDate, user_id) VALUES (?, ?, ?, ?, ?, ?)';

        const values = [
            title,
            description,
            priority,
            false,
            dueDate,
            userId
        ];

        const [result] = await db.query(sql, values);

        res.json({
            message: 'Task Added Successfully!',
            id: result.insertId
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


// GET all tasks
router.get('/', authMiddleware, async (req, res) => {
    try {

        const userId = req.user.userId;

        const sql = `
            SELECT *
            FROM tasks
            WHERE user_id = ?
            ORDER BY
                CASE
                    WHEN priority = 'high' THEN 1
                    WHEN priority = 'medium' THEN 2
                    WHEN priority = 'low' THEN 3
                END
        `;

        const [rows] = await db.query(sql, [userId]);

        res.json(rows);

    } catch (err) {

        res.status(500).json({
            error: 'Failed to fetch tasks'
        });
    }
});


// DELETE a task by id
router.delete('/:id', authMiddleware ,async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        console.log("Deleting Task id: ", id);
        console.log("User id: ", userId);

        const [result] = await db.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task Successfully deleted'
        });

    } catch (err) {
        console.log(error);
        res.status(500).json({
            error: err.message
        });
    }
});


router.put('/:id', authMiddleware, async (req, res) => {

    try {

        const { id } = req.params;
        const userId = req.user.userId;

        const {
            title,
            description,
            priority,
            done,
            dueDate
        } = req.body;

        const sql = `
            UPDATE tasks
            SET
                title = ?,
                description = ?,
                priority = ?,
                done = ?,
                dueDate = ?
            WHERE id = ?
            AND user_id = ?
        `;

        const [result] = await db.query(sql, [
            title,
            description,
            priority,
            done,
            dueDate,
            id,
            userId
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.json({
            message: 'Task updated successfully'
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
});


module.exports = router;