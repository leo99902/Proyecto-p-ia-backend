const GenerateService = require('../services/ia/generate');
const HistoryService = require('../services/ia/history');
const GetService = require('../services/ia/get');

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
    },

    // Get IA records
    get: async (req, res) => {
        try {
            console.log('geminiCtrl => get');
            await new GetService().process(req, res);
        } catch (ex) {
            console.log('geminiCtrl => get exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = geminiCtrl;
