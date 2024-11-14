
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Athena1991!@',
    database: 'finance_app'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// User Registration Endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Registration failed' });
        } else {
            res.send({ message: 'User registered successfully' });
        }
    });
});

// User Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err || results.length === 0) {
            res.status(401).send({ error: 'Invalid credentials' });
        } else {
            res.send({ message: 'Login successful' });
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});


// Add Transaction Endpoint
app.post('/transaction', (req, res) => {
    const { type, amount, description, date } = req.body;
    const sql = 'INSERT INTO transactions (type, amount, description, date) VALUES (?, ?, ?, ?)';
    db.query(sql, [type, amount, description, date], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error adding transaction' });
        } else {
            res.send({ message: 'Transaction added successfully' });
        }
    });
});

// Get Transactions Endpoint
app.get('/transactions', (req, res) => {
    const sql = 'SELECT * FROM transactions';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error retrieving transactions' });
        } else {
            res.send(results);
        }
    });
});

// Add Goal Endpoint
app.post('/goal', (req, res) => {
    const { name, target_amount, current_amount } = req.body;
    const sql = 'INSERT INTO goals (name, target_amount, current_amount) VALUES (?, ?, ?)';
    db.query(sql, [name, target_amount, current_amount], (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error setting goal' });
        } else {
            res.send({ message: 'Goal set successfully' });
        }
    });
});

// Get Goals Endpoint
app.get('/goals', (req, res) => {
    const sql = 'SELECT * FROM goals';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error retrieving goals' });
        } else {
            res.send(results);
        }
    });
});

// Generate Report Endpoint
app.get('/report', (req, res) => {
    const sql = 'SELECT type, SUM(amount) as total FROM transactions GROUP BY type';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: 'Error generating report' });
        } else {
            res.send(results);
        }
    });
});
