'use strict';

const { ObjectId } = require('mongodb');
const operations = require('../../config/db/operations');

module.exports = class DeleteService {

    async process(req, res) {

        try {
            console.log('DeleteService - process - Eliminar usuario');

        const idUser = req.body._id;

        if (!idUser)
            return res.status(400).json({ message: 'El ID del usuario es requerido' });

        const user = await operations.findOne('users', { _id: ObjectId.createFromHexString(idUser) });

        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });

        await operations.deleteOne('users', { _id: ObjectId.createFromHexString(idUser) });

        return res.status(200).json({ message: 'Usuario eliminado exitosamente' });

        } catch (error) {

            console.error('DeleteService - process - Error al eliminar el usuario', error);
            throw error;
        }
    }
}
