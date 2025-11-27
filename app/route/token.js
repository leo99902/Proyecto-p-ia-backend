
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');

const config = require('../config/configuration');
const validarRol = require('./rol');

const tokenRouter = express.Router();
tokenRouter.use((req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (authHeader) {

        let token = authHeader;
        // Si el encabezado contiene "Bearer ", extraemos solo el token
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        jsonwebtoken.verify(token, config.JWT_SECRET, (error, datosDecodificados) => {

           
            if (error)
                return res.status(401).json({ error: 'Autenticación expirada' });
            else {
                // Validar si el usuario está inactivo
                if (datosDecodificados.state && datosDecodificados.state.toLowerCase() === 'inactivo') {
                    return res.status(403).json({ error: 'Usuario inactivo' });
                }

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