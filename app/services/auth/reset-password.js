
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');
const MailSenderReset = require('../mails/mail-sender-reset');

module.exports = class PasswordResetService {

    async process(req, res) {
        try {
            console.log('PasswordResetService - process - Recuperando contraeña');

            let requestData = {

                username: req.body.user,
            };

            if (!requestData.username)
                return res.status(400).json({ message: "El usuario es requerido" });

            requestData = {

                username: requestData.username.trim(),
            };


            const userRecord = await operations.findOne('users', { 'user': requestData.username });
            if (!userRecord)
                return res.status(404).json({ message: "Usuario no encontrado" });

            const email = userRecord.email;
            const name = userRecord.name;

            const CHAR_SETS = [
                'abcdefghijklmnopqrstuvwxyz',
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                '0123456789',
                '!@#$%^&*()_+-=[]{}|;:,.<>?'
            ];
            const PASSWORD_LENGTH = 8;

            let passwordCharacters = [];
            for (let i = 0; i < PASSWORD_LENGTH; i++) {

                const set = CHAR_SETS[Math.floor(Math.random() * CHAR_SETS.length)];

                const char = set.charAt(Math.floor(Math.random() * set.length));

                passwordCharacters.push(char);
            }
            const newPassword = passwordCharacters.join('');

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await operations.updateOne('users', { 'user': requestData.username }, { $set: { 'password': hashedPassword } });

            const mailer = new MailSenderReset();

            mailer.process(email, name, newPassword);

            return res.status(200).json({ message: 'Recibira un correo con una contraseña temporal' });

        } catch (error) {
            console.error('PasswordResetService - process - Error al resetetear el password', error);
            throw error;
        }
    }
}