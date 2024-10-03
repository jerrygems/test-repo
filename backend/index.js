require('dotenv').config();
const express = require('express');
const Redis = require('ioredis');
const { Pool } = require('pg');
const app = express();

const redisClient = new Redis({
    host: '127.0.0.1',
    port: 6379
});

const pgPool = new Pool({
    user: 'postuser',
    host: 'localhost',
    database: 'postdb',
    password: 'postpass',
    port: 5432,
});

app.use(express.json());

// Function to check PostgreSQL connection
const checkPostgresConnection = async () => {
    try {
        await pgPool.query('SELECT NOW()');
        if (process.env.NODE_ENV !== 'test') {
            console.log("PostgreSQL connected successfully");
        }
    } catch (e) {
        console.error('Error connecting to PostgreSQL', e);
    }
};
// Define your routes
app.post('/set', async (req, res) => {
    const { key, value } = req.body;
    try {
        await redisClient.set(key, value); // Set value in Redis
        res.status(200).send({ message: 'Value set successfully in Redis' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error setting value' });
    }
});

app.get('/get/:key', async (req, res) => {
    const { key } = req.params;
    try {
        const value = await redisClient.get(key);
        if (value) {
            res.status(200).send({ key, value });
        } else {
            res.status(404).send({ message: 'Key not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error getting value' });
    }
});

app.get('/hey', async (req, res) => {
    try {
        const str = "hey there";
        res.status(200).json({ message: str });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, async () => {
        await checkPostgresConnection(); // Check connection when server starts
        console.log(`Backend running at http://localhost:${PORT}`);
    });
}

module.exports = {
    app,
    redisClient,
    pgPool
};
