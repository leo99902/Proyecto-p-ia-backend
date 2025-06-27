
const { MongoClient } = require('mongodb');
const config = require('../configuration');

let mongoClient = null;
let database = null;

const CLUSTER_URI = process.env.CLUSTER_URI || 'mongodb://localhost:27017';

// connectDatabase: Creates the database connection

const connectDatabase = async () => {
    try {

        if (database)
            return;

        const mongoOptions = {
            retryWrites: true,
            maxPoolSize: 40,
            maxIdleTimeMS: 300000,
            socketTimeoutMS: 30000
        };

        mongoClient = new MongoClient(CLUSTER_URI, mongoOptions);
        await mongoClient.connect();

        database = mongoClient.db(config.db);
        console.log('✅ MongoDB connection established successfully');

        mongoClient.on('close', function (closeReason) {
            console.log("🔌 MongoDB connection closed - ", closeReason);
        });

        mongoClient.on('error', function (connectionError) {
            console.log("❌ Error in MongoDB connection: ", connectionError);
        });

        mongoClient.on('reconnect', function (reconnectInfo) {
            console.log("🔄 MongoDB connection reconnected and reauthenticated - ", reconnectInfo);
        });

        mongoClient.on('timeout', function (timeoutError) {
            console.log("⏰ Timeout in MongoDB connection: ", timeoutError);
        });

    } catch (connectionError) {
        console.error('❌ Error connecting to MongoDB: ', connectionError);
        throw connectionError;
    }
};

// disconnectDatabase: Closes the database connection

const disconnectDatabase = async () => {
    try {

        if (database) {

            await mongoClient.close();

            mongoClient = null;
            database = null;

            console.log('🔌 MongoDB connection closed successfully');
        }

    } catch (closeError) {
        console.error('❌ Error closing MongoDB connection: ', closeError);
        throw closeError;
    }
};

// getDatabaseConnection: Returns the database connection instance

const getDatabaseConnection = async () => {

    if (!database) {

        console.error('⚠️ No active connection exists');
        await connectDatabase();
    }

    return database;
};

module.exports = { 
    connectDatabase, 
    disconnectDatabase, 
    getDatabaseConnection 
};