const GenerateService = require('../config/db/generate');
const HistoryService = require('../config/db/history');

const geminiCtrl = {

    // Generate content with Gemini
    generate: async (req, res) => {
        try {
            console.log('geminiCtrl => generate');
            await new GenerateService().process(req, res);
        } catch (ex) {
            console.log('geminiCtrl => generate exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // Get conversation history
    history: async (req, res) => {
        try {
            console.log('geminiCtrl => history');
            await new HistoryService().process(req, res);
        } catch (ex) {
            console.log('geminiCtrl => history exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = geminiCtrl;
