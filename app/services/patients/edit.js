
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
                name,
                cedula,
                age,
                address,
                password,
                email,
                occupation,
                phone,
                disease,
                infoDisease
            } = req.body.patient;

            if (!name)
                return res.status(400).json({ message: 'El nombre es requerido' });

            if (!cedula)
                return res.status(400).json({ message: 'La cédula es requerida' });

            if (!age)
                return res.status(400).json({ message: 'La edad es requerida' });

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

            if (!disease)
                return res.status(400).json({ message: 'La enfermedad es requerida' });

           


            if (cedula !== existingPatient.cedula) {
                const patientWithCedula = await operations.findOne('users', { cedula });
                if (patientWithCedula)
                    return res.status(400).json({ message: 'La cédula ya existe' });
            }

            if (email !== existingPatient.email) {
                const patientWithEmail = await operations.findOne('users', { email });
                if (patientWithEmail)
                    return res.status(400).json({ message: 'El email ya existe' });
            }

            const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!regEx.test(password))
                return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial' });

            let hashedPassword = existingPatient.password;
            if (password !== existingPatient.password)
                hashedPassword = await bcrypt.hash(password, 10);

            const updatedPatient = {
                $set: {
                    user:name,
                    cedula,
                    age,
                    address,
                    password: hashedPassword,
                    email,
                    occupation,
                    phone,
                    disease,
                    infoDisease,
                    
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
