'use strict';

const JWT = require('jsonwebtoken');
const Express = require('express');

const config = require('../config/config');
const isValidRole = require('./rol-validator');

const token = Express.Router();
token.use((req, res, next) => {

    let authHeader = req.headers['authorization'];
    let tokenValue = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        tokenValue = authHeader.slice(7); // Quita 'Bearer '
    }

    if (tokenValue) {

        JWT.verify(tokenValue, config.JWT_SECRET, (err, decoded) => {

            if (err)
                return res.status(401).json({ error: 'Autenticación expirada'});
            else {

                if (isValidRole(decoded.azrq)) {
                    req.decoded = decoded;
                    next();
                } else
                    return res.status(403).json({ error: 'No posee los permisos necesarios' });
            }
        });
    } else
        res.status(401).json({ error: 'Autenticación expirada' });
});

module.exports = { token };