const operations = require('../../config/db/operations');

module.exports = class ListAllNotesService {

    async process(req, res) {
        try {
            console.log('ListAllNotesService - process - Listando todas las notas');

            const { name } = req.body;

            const filter = {}; // Inicia con un filtro vacío

            // Si se proporciona un nombre, se agrega al filtro.
            // Asumo que el 'name' corresponde al campo 'createdBy' en la nota.
            if (name && typeof name === 'string' && name.trim() !== '') {
                // Usar una expresión regular para búsqueda parcial e insensible a mayúsculas/minúsculas
                filter.createdBy = { $regex: name.trim(), $options: 'i' };
            }

            // Buscar todas las notas, ordenadas por fecha de creación descendente
            const notes = await operations.findMany('notes', filter, { createdAt: -1 });

            return res.status(200).json({ notes });

        } catch (error) {
            console.error('ListAllNotesService - process - Error al listar todas las notas', error);
            return res.status(500).json({ message: 'Ocurrió un error al listar todas las notas.' });
        }
    }
}
