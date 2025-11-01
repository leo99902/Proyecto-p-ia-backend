const operations = require('../../config/db/operations');

module.exports = class CreateNoteService {

    async process(req, res) {
        try {
            console.log('CreateNoteService - process - Creación de nota');

            const { note } = req.body;
            const user = req.decoded.user; // Obtener el usuario del token decodificado

            if (!note || typeof note !== 'string' || note.trim() === '') {
                return res.status(400).json({ message: 'El contenido de la nota es requerido.' });
            }

            const noteDocument = {
                note: note.trim(),
                createdBy: user,
                createdAt: new Date()
            };

            await operations.insertOne('notes', noteDocument);

            return res.status(201).json({ message: 'Nota guardada exitosamente.' });

        } catch (error) {
            console.error('CreateNoteService - process - Error al guardar la nota', error);
            return res.status(500).json({ message: 'Ocurrió un error al guardar la nota.' });
        }
    }
}