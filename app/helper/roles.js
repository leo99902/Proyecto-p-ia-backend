'use strict';

module.exports = {
    encoded: (role) => {
        if (role === 'Administrador') return 'admin';
        if (role === 'Usuario') return 'user';
    },
    decoded: (role) => {
        if (role === 'admin') return 'Administrador';
        if (role === 'user') return 'Usuario';
    }
};