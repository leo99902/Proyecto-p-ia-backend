'use strict';

let { getConnection } = require('./db');
const db = require('./db');

exports.findOne = async (collectionName, query, projection = {}) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.findOne(query, { projection });
    } catch (error) {
        console.error('Error al buscar en la colección:', error);
        throw error;
    }
};



exports.findMany = async (collectionName, query, sort = {}, pagination = {}, projection = {}) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.find(query, pagination)
            .project(projection)
            .sort(sort)
            .collation({ locale: "en_US", numericOrdering: true })
            .toArray();
    } catch (error) {
        console.error('Error al buscar en la colección:', error);
        throw error;
    }
};

exports.countDocuments = async (collectionName, query) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.countDocuments(query);
    } catch (error) {
        console.error('Error al buscar el conteo en la colección:', error);
        throw error;
    }
};

exports.updateOne = async (collectionName, filter, update) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.updateOne(filter, update);
    } catch (error) {
        console.error('Error al actualizar en la colección:', error);
        throw error;
    }
};

exports.updateMany = async (collectionName, filter, update) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.updateMany(filter, update);
    } catch (error) {
        console.error('Error al actualizar en la colección:', error);
        throw error;
    }
};

exports.insertOne = async (collectionName, query) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.insertOne(query);
    } catch (error) {
        console.error('Error al insertar en la colección:', error);
        throw error;
    }
};

exports.insertMany = async (collectionName, query) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.insertMany(query);
    } catch (error) {
        console.error('Error al insertar en la colección:', error);
        throw error;
    }
};

exports.deleteOne = async (collectionName, query) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.deleteOne(query);
    } catch (error) {
        console.error('Error al eliminar en la colección:', error);
        throw error;
    }
};

exports.deleteMany = async (collectionName, query) => {
    try {
        const dbInstance = await db.getConnection();
        const collection = dbInstance.collection(collectionName);
        return collection.deleteMany(query);
    } catch (error) {
        console.error('Error al eliminar de la colección:', error);
        throw error;
    }
};







