'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const operations = require('../../config/db/operations');
const config = require('../../config/configuration');

const { encoded } = require('../../helper/roles');

module.exports = class AuthSessionHandler {

    async process(req, res) {
        try {
            console.log('AuthSessionHandler - process - Inicio de sesión');

            const { user, password } = req.body;

            if (!user || !password) {
                return res.status(400).json({ message: 'El usuario y contraseña son requeridos' });
            }

            const trimmedUser = user.trim();
            const trimmedPassword = password.trim();

            const foundUser = await operations.findOne('users', { user: trimmedUser });
            if (!foundUser) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            // Verificar si el usuario está inactivo
            if (foundUser.state && foundUser.state.toLowerCase() === 'inactivo') {
                return res.status(403).json({ message: 'Usuario inactivo' });
            }

            const isPasswordValid = await bcrypt.compare(trimmedPassword, foundUser.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
            }

            const menuRoles = await this.getMenu(encoded(foundUser.role));
            const menu = (menuRoles && menuRoles.length > 0) ? menuRoles[0].permits : [];

            const payload = {
                user: foundUser.user,
                name: foundUser.name,
                email: foundUser.email,
                oxcj: encoded(foundUser.role),
                state: foundUser.state,
                menu
            };

            const token = jwt.sign(payload, config.JWT_SECRET, {
                expiresIn: 3600 * 10 // Sesión de 10hs
            });

            return res.status(200).json({
                message: 'Autenticación correcta',
                token
            });

        } catch (error) {
            console.error('AuthSessionHandler - process - Error en el inicio de sesión', error);
            throw error;
        }
    }

    async getMenu(role) {
        return await operations.findMany('roles', { role });
    }

}