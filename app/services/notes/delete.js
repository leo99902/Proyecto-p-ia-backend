const { ObjectId } = require('mongodb');
const operations = require('../../config/db/operations');

module.exports = class DeleteNoteService {

    async process(req, res) {
        try {
            console.log('DeleteNoteService - process - Eliminando nota');

            const { _id } = req.body;
            const user = req.decoded.user; // Obtener el usuario del token decodificado

            if (!_id) {
                return res.status(400).json({ message: 'El ID de la nota es requerido.' });
            }

            // Construir el filtro para asegurar que el usuario solo puede borrar sus propias notas
            const filter = {
                _id: ObjectId.createFromHexString(_id),
                createdBy: user
            };

            const result = await operations.deleteOne('notes', filter);

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Nota no encontrada o no tienes permiso para eliminarla.' });
            }

            return res.status(200).json({ message: 'Nota eliminada exitosamente.' });

        } catch (error) {
            console.error('DeleteNoteService - process - Error al eliminar la nota', error);
            if (error.name === 'BSONError') {
                 return res.status(400).json({ message: 'El ID de la nota no es válido.' });
            }
            return res.status(500).json({ message: 'Ocurrió un error al eliminar la nota.' });
        }
    }
}