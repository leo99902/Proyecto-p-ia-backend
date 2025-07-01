
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const timeout = require('connect-timeout');
const dotenv = require('dotenv');
dotenv.config();

const { connectDatabase, disconnectDatabase } = require('./app/config/db/db');
const router = require('./app/route/routes');

const app = express();
const SERVER_PORT = process.env.PORT || 6060;

// Database connection
(async () => {
    try {
        await connectDatabase();
        console.log('✅ Database connected');
    } catch (error) {
        console.error('❌ Failed to connect to database:', error);
        process.exit(1);
    }
})();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(timeout('1000s'));

// Routes
router.initializeRoutes(app);

// Server start
app.listen(SERVER_PORT, () => {
    console.log(`🚀 Server running on port ${SERVER_PORT}`);
    console.log('pid', process.pid);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
    console.log(`${signal} received: closing server and database connection`);
    await disconnectDatabase();
    process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = { app };