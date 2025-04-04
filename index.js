require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL connected');
        connection.release();
    } catch (err) {
        console.error('MySQL connection error:', err);
        process.exit(1); // Exit the application if the database connection fails
    }
})();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/about', (req, res) => {
    res.send('About me! NGA!');
});

app.get('/portfolio', (req, res) => {
    res.send('On going projects!');
});

app.get('/contact', (req, res) => {
    res.send('How to reach me!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});