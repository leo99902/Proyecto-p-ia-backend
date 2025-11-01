
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');

module.exports = class CreateService {

    async process(req, res) {

        try {
            console.log('CreateService - process - Creación de paciente');

            let entry = {
                name: req.body.name,
                cedula: req.body.cedula,
                age: req.body.age,
                address: req.body.address,
                password: req.body.password,
                email: req.body.email,
                occupation: req.body.occupation,
                phone: req.body.phone,
                disease: req.body.disease,
                infoDisease: req.body.infoDisease,
                state: true
            };

          
            if (!entry.name)
                return res.status(400).json({ message: 'El nombre es requerido' });

            if (!entry.cedula)
                return res.status(400).json({ message: 'La cédula es requerida' });

            if (!entry.age)
                return res.status(400).json({ message: 'La edad es requerida' });

            
            if (!entry.address)
                return res.status(400).json({ message: 'La dirección es requerida' });
            
            if (!entry.password)
                return res.status(400).json({ message: 'La contraseña es requerida' });
            
            if (!entry.email)
                return res.status(400).json({ message: 'El email es requerido' });
            
            if (!entry.occupation)
                return res.status(400).json({ message: 'La ocupación es requerida' });
            
            if (!entry.phone)
                return res.status(400).json({ message: 'El teléfono es requerido' });
            
            if (!entry.disease)
                return res.status(400).json({ message: 'La enfermedad es requerida' });
            

            // Validar unicidad de cédula y email
            const patientWithCedula = await operations.findOne('users', { 'cedula': entry.cedula });
            if (patientWithCedula)
                return res.status(400).json({ message: 'La cédula ya existe' });

            const patientWithEmail = await operations.findOne('users', { 'email': entry.email });
            if (patientWithEmail)
                return res.status(400).json({ message: 'El email ya existe' });

            // Validar contraseña segura
            const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!regEx.test(entry.password))
                return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial' });

            const hashedPassword = await bcrypt.hash(entry.password, 10);

            const newPatient = {
                name: entry.name,
                cedula: entry.cedula,
                age: entry.age,
                address: entry.address,
                password: hashedPassword,
                email: entry.email,
                occupation: entry.occupation,
                phone: entry.phone,
                disease: entry.disease,
                infoDisease: entry.infoDisease,
                role:"Paciente",
                state: entry.state
            };

            await operations.insertOne('users', newPatient);

            return res.status(200).json({ message: 'Paciente creado exitosamente' });

        } catch (error) {
            console.error('CreateService - process - Error al crear el paciente', error);
            throw error;
        }
    }
}