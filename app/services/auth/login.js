'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const dbOps = require('../../config/db/operations');
const appConfig = require('../../config/config');

const { encodedRole } = require('../../helper/manage-role');
const validateFields = require('../../helper/is-object');

class AuthSessionHandler {

    async authenticate(request, response) {
        try {
            console.log('AuthSessionHandler - authenticate - Intentando login');

            const credentials = {
                username: request.body.user,
                passwd: request.body.password
            };

            if (!credentials.username || !credentials.passwd) {
                return response.status(400).json({ message: 'El usuario y contraseña son requeridos' });
            }

            credentials.username = credentials.username.trim();
            credentials.passwd = credentials.passwd.trim();

            if (validateFields([credentials.username, credentials.passwd])) {
                return response.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            const foundUser = await dbOps.findOne('users', { 'user': credentials.username });
            if (!foundUser) {
                return response.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            const isPasswordValid = await bcrypt.compare(credentials.passwd, foundUser.password);
            if (!isPasswordValid) {
                return response.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            const jwtPayload = {
                user: foundUser.user,
                name: foundUser.name,
                email: foundUser.email,
                azrq: encodedRole(foundUser.role)
            };
            console.log(jwtPayload);

            const authToken = jwt.sign(jwtPayload, appConfig.JWT_SECRET, {
                expiresIn: 3600 * 8 // 8 horas de sesión
            });

            return response.status(200).json({
                message: 'Autenticación correcta',
                token: authToken
            });

        } catch (err) {
            console.error('AuthSessionHandler - authenticate - Error durante login', err);
            throw err;
        }
    }

}

module.exports = AuthSessionHandler;