'use strict';

const { MongoClient } = require('mongodb');
const config = require('../config');

let client = null;
let db = null;

const CLUSTER_URI = process.env.CLUSTER_URI || 'mongodb://localhost:27017';

/**
 * openConnection
 * Crea la conexión de la base de datos
 **/
const openConnection = async () => {
    try {

        if (db)
            return;

        const OPTIONS = {
            retryWrites: true,
            maxPoolSize: 40,
            maxIdleTimeMS: 300000,
            socketTimeoutMS: 30000
        };

        client = new MongoClient(CLUSTER_URI, OPTIONS);
        await client.connect();

        db = client.db(config.db);
        console.log('Conexión a MongoDB establecida');

        client.on('close', function (reason) {
            console.log(" --------->  Conexion MongoDB cerrada - ", reason);
        });

        client.on('error', function (error) {
            console.log(" ---------> Conexion MongoDB con error: ", error);
        });

        client.on('reconnect', function (info) {
            console.log(" ---------> Conexion MongoDB reconectada y reautenticada - ", info);
        });

        client.on('timeout', function (error) {
            console.log(" ---------> Conexion MongoDB timeout: ", error);
        });

    } catch (error) {
        console.error('Error al conectar a MongoDB: ', error);
        throw error;
    }
};

/**
 * closeConnection
 * Cierra la conexión de la base de datos
 **/
const closeConnection = async () => {
    try {

        if (db) {

            await client.close();

            client = null;
            db = null;

            console.log('Conexión a MongoDB cerrada');
        }

    } catch (error) {
        console.error('Error al cerrar la conexión a MongoDB: ', error);
        throw error;
    }
};

/**
 * getConnection
 * Devuelve la instancia de la conexión a la base de datos
 **/
const getConnection = async () => {

    if (!db) {

        console.error('No existe una conexión activa');
        await openConnection();
    }

    return db;
};

module.exports = { openConnection, closeConnection, getConnection };