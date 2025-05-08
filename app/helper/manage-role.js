'use strict';

module.exports = {
    encodedRole: (role) => {
        if (role === 'Administrador') return 'admin';
        if (role === 'Usuario') return 'user';
    },
    decodedRole: (role) => {
        if (role === 'admin') return 'Administrador';
        if (role === 'user') return 'Usuario';
    }
};