'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');

module.exports = class RenewPasswordService {

    async process(req, res) {

        try {

            console.log('RenewPassword - process - Cambiando contraseña');

            const { currentPassword, newPassword, confirmNewPassword } = req.body;

            if (!currentPassword || !newPassword || !confirmNewPassword) {
                return res.status(400).json({ message: 'Las contraseñas son requeridas' });
            }

            const trimmedCurrentPassword = currentPassword.trim();
            const trimmedNewPassword = newPassword.trim();
            const trimmedConfirmNewPassword = confirmNewPassword.trim();

            if (trimmedNewPassword !== trimmedConfirmNewPassword) {
                return res.status(400).json({ message: 'Las contraseñas deben ser igualess' });
            }

            const passwordPolicy = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!passwordPolicy.test(trimmedNewPassword)) {
                return res.status(400).json({
                    message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial'
                });
            }

            const decodeUser = req.decoded.user
            
            console.log(decodeUser);

            const userRecord = await operations.findOne('users', { user: decodeUser });
            if (!userRecord) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const isCurrentPasswordValid = await bcrypt.compare(trimmedCurrentPassword, userRecord.password);
            if (!isCurrentPasswordValid) {
                return res.status(400).json({ message: 'Contraseña actual incorrecta' });
            }

            const hashedNewPassword = await bcrypt.hash(trimmedNewPassword, 10);
            await operations.updateOne(
                'users',
                { user: decodeUser },
                { $set: { password: hashedNewPassword } }
            );

            return res.status(200).json({ message: 'Contraseña cambiada exitosamente' });

        } catch (error) {

            console.error('RenewPassword - process - Error la cambiar contraseña', error);
            throw error;
        }
    }
};