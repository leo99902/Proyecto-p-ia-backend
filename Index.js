'use strict';
 
const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');
const timeout = require('connect-timeout');
const dotenv = require('dotenv');
dotenv.config();

const { openConnection, closeConnection } = require('./app/config/db/db');
const router = require('./app/route/route');

const app = Express();
const SERVER_PORT = 6060;

openConnection();

app.use(Cors());
app.use(BodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(BodyParser.json({ limit: '1mb' }));
app.use(timeout('1000s'));

app.listen(SERVER_PORT, () => {
	console.log(`Server running on port ${SERVER_PORT}`);
});

router.initializeRoutes(app);

console.log('pid', process.pid);

/**
 * Manejo de eventos del S.O donde se maneja la caida de MS y se cierra la conexión abierta a MongoDB
 **/
process.on('SIGTERM', async () => {
	console.log('SIGTERM Se cierra proceso de node');
	await closeConnection();
	process.exit(0);
});

process.on('SIGINT', async () => {
	console.log('SIGINT Se cierra proceso de node');
	await closeConnection();
	process.exit(0);
});

module.exports = { app };