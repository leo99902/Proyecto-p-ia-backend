'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const operations = require('../../config/db/operations');
const config = require('../../config/config');

const { encodedRole } = require('../../helper/manage-role');
const ObjectValidator = require('../../helper/is-object');

module.exports = class LoginService {

    async process(req, res) {
        try {
            
            console.log('LoginService - process - Inicio de sesión');

        let entry = {
            user: req.body.user,
            password: req.body.password
        };

        if (!entry.user || !entry.password)
            return res.status(400).json({ message: 'El usuario y contraseña son requeridos' });

        entry = {
            user: entry.user.trim(),
            password: entry.password.trim()
        };

        if (ObjectValidator([entry.user, entry.password]))
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        const user = await operations.findOne('users', { 'user': entry.user });
        if (!user)
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        const passwordMatching = await bcrypt.compare(entry.password, user.password);
        if (!passwordMatching)
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        const payload = {
            user: user.user,
            name: user.name,
            email: user.email,
            role: encodedRole(user.role)
        };
        console.log(payload);
        const token = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: 3600 * 8 // Sesión de 8hs      
        });

        return res.status(200).json({
            message: 'Autenticación correcta',
            token
        });

        }catch (error) {

            console.error('LoginService - process - Error en el inicio de sesión', error);
            throw error;
        }
    }

    

}