
const db = require('./db');

/**
 * Helper to get collection instance
 */
const getCollection = async (collectionName) => {
    const dbInstance = await db.getDatabaseConnection();
    return dbInstance.collection(collectionName);
};

/**
 * Find one document in a collection
 */
const findOne = async (collectionName, query, projection = {}) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.findOne(query, { projection });
    } catch (error) {
        console.error('Error finding document in collection:', error);
        throw error;
    }
};

/**
 * Find many documents in a collection
 */
const findMany = async (collectionName, query, sort = {}, pagination = {}, projection = {}) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.find(query, pagination)
            .project(projection)
            .sort(sort)
            .collation({ locale: "en_US", numericOrdering: true })
            .toArray();
    } catch (error) {
        console.error('Error finding documents in collection:', error);
        throw error;
    }
};

/**
 * Count documents in a collection.
 * Note: This is an alias for countDocuments for compatibility.
 */
const count = async (collectionName, query) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.countDocuments(query);
    } catch (error) {
        console.error('Error counting documents in collection:', error);
        throw error;
    }
};

/**
 * Count documents in a collection
 */
const countDocuments = async (collectionName, query) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.countDocuments(query);
    } catch (error) {
        console.error('Error counting documents in collection:', error);
        throw error;
    }
};

/**
 * Update one document in a collection
 */
const updateOne = async (collectionName, filter, update) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.updateOne(filter, update);
    } catch (error) {
        console.error('Error updating document in collection:', error);
        throw error;
    }
};

/**
 * Update many documents in a collection
 */
const updateMany = async (collectionName, filter, update) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.updateMany(filter, update);
    } catch (error) {
        console.error('Error updating documents in collection:', error);
        throw error;
    }
};

/**
 * Insert one document into a collection
 */
const insertOne = async (collectionName, document) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.insertOne(document);
    } catch (error) {
        console.error('Error inserting document into collection:', error);
        throw error;
    }
};

/**
 * Insert many documents into a collection
 */
const insertMany = async (collectionName, documents) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.insertMany(documents);
    } catch (error) {
        console.error('Error inserting documents into collection:', error);
        throw error;
    }
};

/**
 * Delete one document from a collection
 */
const deleteOne = async (collectionName, query) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.deleteOne(query);
    } catch (error) {
        console.error('Error deleting document from collection:', error);
        throw error;
    }
};

/**
 * Delete many documents from a collection
 */
const deleteMany = async (collectionName, query) => {
    try {
        const collection = await getCollection(collectionName);
        return collection.deleteMany(query);
    } catch (error) {
        console.error('Error deleting documents from collection:', error);
        throw error;
    }
};

module.exports = {
    findOne,
    findMany,
    count,
    countDocuments,
    updateOne,
    updateMany,
    insertOne,
    insertMany,
    deleteOne,
    deleteMany
};
