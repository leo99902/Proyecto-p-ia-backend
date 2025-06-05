'use strict';

const { decoded } = require('../helper/roles');

// El administrador puede acceder a todo
module.exports = (role) => {
    const decodifiedRole = decoded(role);
    if (decodifiedRole === 'Administrador') return true;
    return false; // El usuario no tiene permisos especiales
};