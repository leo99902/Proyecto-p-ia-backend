
module.exports = {
    encoded: (role) => {
        if (role === 'Administrador') return 'admin';
        if (role === 'Paciente') return 'patient';
        if (role === 'Secretario') return 'secretary';
    },
    decoded: (role) => {
        if (role === 'admin') return 'Administrador';
        if (role === 'patient') return 'Paciente';
        if (role === 'secretary') return 'Secretario';
    }
};