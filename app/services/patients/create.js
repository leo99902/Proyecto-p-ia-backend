
const bcrypt = require('bcrypt');
const operations = require('../../config/db/operations');

module.exports = class CreateService {

    async process(req, res) {

        try {
            console.log('CreateService - process - Creación de paciente');

            let entry = {
                user: req.body.name,
                cedula: req.body.cedula,
                birthDate: req.body.birthDate,
                address: req.body.address,
                password: req.body.password,
                email: req.body.email,
                occupation: req.body.occupation,
                phone: req.body.phone,
                disease: req.body.disease,
                infoDisease: req.body.infoDisease,
                state: "activo"
            };

          
            if (!entry.user)
                return res.status(400).json({ message: 'El nombre es requerido' });

            if (!entry.cedula)
                return res.status(400).json({ message: 'La cédula es requerida' });

            if (!entry.birthDate)
                return res.status(400).json({ message: 'La fecha de nacimiento es requerida' });

            
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
            
          
            

            // Validar unicidad de nombre, cédula y email
            const patientWithName = await operations.findOne('users', { 'user': entry.user });
            if (patientWithName)
                return res.status(400).json({ message: 'El nombre no puede ser igual ya que es el nombre con el cual van iniciar sesión' });


            const patientWithCedula = await operations.findOne('users', { 'cedula': entry.cedula });
            if (patientWithCedula)
                return res.status(400).json({ message: 'La cédula ya existe en el sistema' });

            const patientWithEmail = await operations.findOne('users', { 'email': entry.email });
            if (patientWithEmail)
                return res.status(400).json({ message: 'El email ya existe en el sistema' });

            // Validar contraseña segura
            const regEx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,}$/;
            if (!regEx.test(entry.password))
                return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres, 1 dígito, 1 caracter en mayúscula y un caracter especial' });

            const hashedPassword = await bcrypt.hash(entry.password, 10);

            const newPatient = {
                user: entry.user,
                cedula: entry.cedula,
                birthDate: entry.birthDate,
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
            
            console.log(newPatient)
            await operations.insertOne('users', newPatient);

            return res.status(200).json({ message: 'Paciente creado exitosamente' });

        } catch (error) {
            console.error('CreateService - process - Error al crear el paciente', error);
            throw error;
        }
    }
}
