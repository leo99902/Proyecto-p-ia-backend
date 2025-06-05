'use strict';

const JWT = require('jsonwebtoken');
const Express = require('express');

const config = require('../config/config');
const isValidRole = require('./rol-validator');

const tokenValidator = Express.Router();
tokenValidator.use((req, res, next) => {

    const token = req.headers['authorization'];

    if (token) {

        JWT.verify(token, config.JWT_SECRET, (err, decoded) => {

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
        res.status(401).json({ error: 'Autenticación expirada - Ingrese a SAJ nuevamente' });
});

module.exports = { tokenValidator };