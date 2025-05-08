'use strict';

const { decodedRole } = require('../helper/manage-role');

// El administrador puede acceder a todo
module.exports = (role, endpoint) => {
    const decodifiedRole = decodedRole(role);
    if (decodifiedRole === 'Administrador') return true;
    return false; // El usuario no tiene permisos especiales
};