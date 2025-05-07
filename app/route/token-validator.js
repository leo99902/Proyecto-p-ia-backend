'use strict';

const Express = require('express');

const tokenValidator = Express.Router();
tokenValidator.use((req, res, next) => {
    // Permite el paso de todas las solicitudes sin validación
    next();
});

module.exports = { tokenValidator };