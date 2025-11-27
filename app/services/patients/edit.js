
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');

module.exports = class EditService {

    async process(req, res) {
        try {
            console.log('EditService - process - Editar paciente');

            const idPatient = req.body._id;

            const existingPatient = await operations.findOne('users', { _id: ObjectId.createFromHexString(idPatient) });
            if (!existingPatient)
                return res.status(404).json({ message: 'Paciente no encontrado' });

            const {
                user,
                cedula,
                birthDate,
                address,
                password,
                email,
                occupation,
                phone,
                disease,
                infoDisease,
                state
            } = req.body.patient;

            if (!user)
                return res.status(400).json({ message: 'El nombre es requerido' });

            if (!cedula)
                return res.status(400).json({ message: 'La cédula es requerida' });

            if (!birthDate)
                return res.status(400).json({ message: 'La fecha de nacimiento es requerida' });

            if (!address)
                return res.status(400).json({ message: 'La dirección es requerida' });

            if (!password)
                return res.status(400).json({ message: 'La contraseña es requerida' });

            if (!email)
                return res.status(400).json({ message: 'El email es requerido' });

            if (!occupation)
                return res.status(400).json({ message: 'La ocupación es requerida' });

            if (!phone)
                return res.status(400).json({ message: 'El teléfono es requerido' });

         
            if (!state)
                return res.status(400).json({ message: 'El estado es requerido' });


            const patientWithName = await operations.findOne('users', { 'user': user });
                if (patientWithName)
                return res.status(400).json({ message: 'El nombre no puede ser igual ya que es el nombre con el cual van iniciar sesión' });


            if (cedula !== existingPatient.cedula) {
                const patientWithCedula = await operations.findOne('users', { cedula });
                if (patientWithCedula)
                    return res.status(400).json({ message: 'La cédula ya existe' });
            }

            if (email !== existingPatient.email) {
                const patientWithEmail = await operations.findOne('users', { email });
                if (patientWithEmail)
                    return res.status(400).json({ message: 'La cédula ya existe en el sistema' });
            }

            const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!regEx.test(password))
                return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial' });

            let hashedPassword = existingPatient.password;
            if (password !== existingPatient.password)
                hashedPassword = await bcrypt.hash(password, 10);

            const updatedPatient = {
                $set: {
                    user,
                    cedula,
                    birthDate,
                    address,
                    password: hashedPassword,
                    email,
                    occupation,
                    phone,
                    disease,
                    infoDisease,
                    state
                }
            };

            await operations.updateOne('users', { _id: ObjectId.createFromHexString(idPatient) }, updatedPatient);

            return res.status(200).json({ message: 'Paciente actualizado exitosamente' });

        } catch (error) {
            console.error('EditService - process - Error al editar el paciente', error);
            throw error;
        }
    }
}
