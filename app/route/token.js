'use strict';

const jsonwebtoken = require('jsonwebtoken');
const express = require('express');

const config = require('../config/configuration');
const validarRol = require('./rol');

const tokenRouter = express.Router();
tokenRouter.use((req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (authHeader) {

        jsonwebtoken.verify(authHeader, config.JWT_SECRET, (error, datosDecodificados) => {

            console.log(datosDecodificados);

            if (error)
                return res.status(401).json({ error: 'Autenticación expirada' });
            else {

                if (validarRol(datosDecodificados.oxcj)) {
                    req.decoded = datosDecodificados;
                    next();
                } else
                    return res.status(403).json({ error: 'No posee los permisos necesarios' });
            }
        });
    } else
        res.status(401).json({ error: 'Autenticación expirada' });
});

module.exports = { token: tokenRouter };