
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');
const { ALLOWED_USER_ROLES } = require('./const/users'); 

module.exports = class EditService {

    async process(req, res) {

        try {

            console.log('EditService - process - Editar usuario');

            const idUser = req.body._id;

            const existingUser = await operations.findOne('users', { _id: ObjectId.createFromHexString(idUser) });
            if (!existingUser)
                return res.status(404).json({ message: 'Usuario no encontrado' });

            const { user, password, name, cedula, email, role, state } = req.body.user;
            if (!user)
                return res.status(400).json({ message: 'El usuario es requerido' });

            if (!password)
                return res.status(400).json({ message: 'La contraseña es requerida' });

            if (!name)
                return res.status(400).json({ message: 'El nombre es requerido' });

            if (!cedula)
                return res.status(400).json({ message: 'La cedula es requerida' });

            if (!email)
                return res.status(400).json({ message: 'El email es requerido' });

            if (!role)
                return res.status(400).json({ message: 'El rol es requerido' });

            // Usa la constante exportada para validar el rol
            if (!ALLOWED_USER_ROLES.includes(role)) 
                return res.status(400).json({ message: 'Solo se permite registrar Administrador o Secretario' });

            if (!state)
                return res.status(400).json({ message: 'El estado es requerido' });

            const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!regEx.test(password))
                return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial' });

            if (email !== existingUser.email) {
                const userWithEmail = await operations.findOne('users', { email });
                if (userWithEmail)
                    return res.status(400).json({ message: 'El email ya existe' });
            }

            if (user !== existingUser.user) {
                const userWithUsername = await operations.findOne('users', { user });
                if (userWithUsername)
                    return res.status(400).json({ message: 'El usuario ya existe' });
            }

            if (cedula !== existingUser.cedula) {
                const userWithCedula = await operations.findOne('users', { cedula });
                if (userWithCedula)
                    return res.status(400).json({ message: 'La cedula ya existe' });
            }

            let hashedPassword = existingUser.password;
            if (password !== existingUser.password)
                hashedPassword = await bcrypt.hash(password, 10);

            const updatedUser = {
                $set: {
                    user,
                    password: hashedPassword,
                    name,
                    cedula,
                    email,
                    role,
                    state,
                }
            };

            await operations.updateOne('users', { _id: ObjectId.createFromHexString(idUser) }, updatedUser);

            return res.status(200).json({ message: 'Usuario actualizado exitosamente' });

        } catch (error) {

            console.error('EditService - process - Error al editar el usuario', error);
            throw error;
        }
    }
}
