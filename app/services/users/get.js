'use strict';

const { ObjectId } = require('mongodb');
const operations = require('../../config/db/operations');
const { ALLOWED_USER_ROLES } = require('./const/users');

module.exports = class GetService {

    async process(req, res) {

        try {
            console.log('GetService - process - Obtener usuario');

            const idUser = req.body._id;

            const user = await operations.findOne('users', { _id: ObjectId.createFromHexString(idUser) });
            if (!user)
                return res.status(404).json({ message: 'Usuario no encontrado' });

            // Solo permite roles permitidos
            if (!ALLOWED_USER_ROLES.includes(user.role)) {
                return res.status(403).json({ message: 'No autorizado para ver este usuario' });
            }
        
            return res.status(200).json(user);

        } catch (error) {

            console.error('GetService - process - Error al obtener el usuario', error);
            throw error;
        }
    }
}
