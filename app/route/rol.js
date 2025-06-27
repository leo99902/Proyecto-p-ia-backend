
const { decoded } = require('../helper/roles');

// El administrador puede acceder a todo
module.exports = (role) => {
    const decodifiedRole = decoded(role);
    if (decodifiedRole === 'Administrador') return true;

    if (decodifiedRole === 'Secretario') return true;

    if (decodifiedRole === 'Paciente') return true;

    return false; // El usuario no tiene permisos especiales
};