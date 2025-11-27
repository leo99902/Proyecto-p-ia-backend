const operations = require('../../config/db/operations');

module.exports = class HistoryService {

    async process(req, res) {
        try {
            console.log('HistoryService - process - Obteniendo historial de Gemini');

            const { user } = req.body;

            const filter = {};

            // Si se proporciona un usuario, se filtra por él
            if (user) {
                filter.user = user;
            }

            // Buscar mensajes ordenados por fecha de creación descendente
            const messages = await operations.findMany('message', filter, { createdAt: -1 });

            return res.status(200).json({ history: messages });

        } catch (error) {
            console.error('HistoryService - process - Error al obtener el historial de Gemini', error);
            return res.status(500).json({ message: 'Ocurrió un error al obtener el historial.' });
        }
    }
}