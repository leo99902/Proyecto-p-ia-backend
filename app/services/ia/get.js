const operations = require('../../config/db/operations');

module.exports = class GetService {
    /**
     * Procesa la solicitud para obtener registros de la colección 'ia'.
     * Si se provee un 'id', cuenta los registros para ese usuario.
     * Si no, devuelve todos los registros.
     * @param {object} req - El objeto de solicitud de Express.
     * @param {object} res - El objeto de respuesta de Express.
     */
    async process(req, res) {
        try {
            const { _id } = req.body;

            if (_id) {
                // Si se proporciona un _id, contamos los registros que coinc_iden.
            
                const count = await operations.count('messages', { id: _id });


            
                return res.status(200).json({ count });

            } else {
              
                    return res.status(404).json({ message: 'No se encontraron registros de IA.' });
         
            }
        } catch (error) {
            console.error('GetService - process - Error al obtener registros de IA', error);
            return res.status(500).json({ message: 'Error interno del servidor al procesar la solicitud.' });
        }
    }
};