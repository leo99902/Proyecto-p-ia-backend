const operations = require('../../config/db/operations');

module.exports = class ListNotesService {

    async process(req, res) {
        try {
            console.log('ListNotesService - process - Listando notas por usuario');

            const user = req.decoded.user; // Obtener el usuario del token decodificado

            const filter = {
                createdBy: user
            };

            // Buscar notas ordenadas por fecha de creación descendente
            const notes = await operations.findMany('notes', filter, { createdAt: -1 });

            return res.status(200).json({ notes });

        } catch (error) {
            console.error('ListNotesService - process - Error al listar las notas', error);
            return res.status(500).json({ message: 'Ocurrió un error al listar las notas.' });
        }
    }
}