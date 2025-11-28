const operations = require('../../config/db/operations');

module.exports = class CreateNoteService {

    async process(req, res) {
        try {
            console.log('CreateNoteService - process - Creación de nota');

            const { title, content, noteList, idPatient } = req.body;
            const user = req.decoded.user; // Obtener el usuario del token decodificado
              const role = req.decoded.oxcj; // Obtener el rol del token decodificado

            if (!title || typeof title !== 'string' || title.trim() === '') {
                return res.status(400).json({ message: 'El título de la nota es requerido.' });
            }
            
            if (!content || typeof content !== 'string' || content.trim() === '') {
                return res.status(400).json({ message: 'El contenido de la nota es requerido.' });
            }

            const noteDocument = {
                title: title.trim(),
                content: content.trim(),
                createdBy: user,
                createdAt: new Date(),
                listType: noteList || false,
                role 
            };

            // Si la nota es de tipo lista (para un paciente), se agrega el idPatient
            if (noteList === true) {
                noteDocument.idPatient = idPatient;
            }

            await operations.insertOne('notes', noteDocument);

            return res.status(201).json({ message: 'Nota guardada exitosamente.' });

        } catch (error) {
            console.error('CreateNoteService - process - Error al guardar la nota', error);
            return res.status(500).json({ message: 'Ocurrió un error al guardar la nota.' });
        }
    }
}