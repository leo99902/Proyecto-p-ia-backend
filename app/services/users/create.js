
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');
const { ALLOWED_USER_ROLES } = require('./const/users'); 

module.exports = class CreateService {

    async process(req, res) {

        try {
            
            console.log('CreateService - process - Creación de usuario');

            let entry = {
                user: req.body.user,
                password: req.body.password,
                name: req.body.name,
                cedula: req.body.cedula,
                email: req.body.email,
                role: req.body.role,
                state: req.body.state
            };

            if (!entry.user)
                return res.status(400).json({ message: 'El usuario es requerido' });

            if (!entry.password)
                return res.status(400).json({ message: 'La contraseña es requerida' });

            if (!entry.name)
                return res.status(400).json({ message: 'El nombre es requerido' });

            if (!entry.cedula)
                return res.status(400).json({ message: 'La cedula es requerida' });

            if (!entry.email)
                return res.status(400).json({ message: 'El email es requerido' });

            if (!entry.role)
                return res.status(400).json({ message: 'El rol es requerido' });

            if (!entry.state)
                return res.status(400).json({ message: 'El estado es requerido' });

            entry = {
                user: entry.user.trim(),
                password: entry.password.trim(),
                name: entry.name.trim(),
                cedula: entry.cedula.trim(),
                email: entry.email.trim(),
                role: entry.role.trim(),
                state: entry.state.trim(),
            };

            const userWithCedula = await operations.findOne('users', { 'cedula': entry.cedula });
            if (userWithCedula)
                return res.status(400).json({ message: 'La cedula ya existe' });

            const userWithEmail = await operations.findOne('users', { 'email': entry.email });
            if (userWithEmail)
                return res.status(400).json({ message: 'El email ya existe' });

            const userWithUsername = await operations.findOne('users', { 'user': entry.user });
            if (userWithUsername)
                return res.status(400).json({ message: 'El usuario ya existe' });

            // Usa la constante exportada para validar el rol
            if (!ALLOWED_USER_ROLES.includes(entry.role)) {
                return res.status(400).json({ message: 'Solo se permite registrar Administrador o Secretario' });
            }

            const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!regEx.test(entry.password))
                return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial' });
            const hashedPassword = await bcrypt.hash(entry.password, 10);

            const newUser = {
                user: entry.user,
                name: entry.name,
                cedula: entry.cedula,
                email: entry.email,
                role: entry.role,
                password: hashedPassword,
                state: entry.state,
            };

            await operations.insertOne('users', newUser);

            return res.status(200).json({ message: 'Usuario creado exitosamente' });

        } catch (error) {
            console.error('CreateService - process - Error al crear el usuario', error);
            throw error;
        }
    }
}