'use strict';

const { ObjectId } = require('mongodb');
const operations = require('../../config/db/operations');
const { ALLOWED_USER_ROLES } = require('../users/const/users');

module.exports = class GetService {

    async process(req, res) {
        try {
            console.log('GetService - process - Obtener paciente');

            const idPatient = req.body._id;

            if (!idPatient) {
                return res.status(400).json({ message: 'El ID del paciente es requerido' });
            }

            const patient = await operations.findOne('users', { _id: ObjectId.createFromHexString(idPatient) });

            if (ALLOWED_USER_ROLES.includes(patient.role)) {
                return res.status(403).json({ message: 'No autorizado para ver este usuario' });
            }

            if (!patient)
                return res.status(404).json({ message: 'Paciente no encontrado' });

            return res.status(200).json(patient);

        } catch (error) {
            console.error('GetService - process - Error al obtener el paciente', error);
            throw error;
        }
    }
}