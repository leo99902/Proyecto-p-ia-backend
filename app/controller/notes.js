const CreateNoteService = require('../services/notes/create');
const ListNotesService = require('../services/notes/list');
const DeleteNoteService = require('../services/notes/delete');
const ListAllNotesService = require('../services/notes/list-all');


const notesCtrl = {

    create: async (req, res) => {
        try {
            console.log('notesCtrl => create');
            await new CreateNoteService().process(req, res);
        } catch (ex) {
            console.log('notesCtrl => create exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // List all notes (for admin)
    listAll: async (req, res) => {
        try {
            console.log('notesCtrl => listAll');
            await new ListAllNotesService().process(req, res);
        } catch (ex) {
            console.log('notesCtrl => listAll exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    list: async (req, res) => {
        try {
            console.log('notesCtrl => list');
            await new ListNotesService().process(req, res);
        } catch (ex) {
            console.log('notesCtrl => list exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    delete: async (req, res) => {
        try {
            console.log('notesCtrl => delete');
            await new DeleteNoteService().process(req, res);
        } catch (ex) {
            console.log('notesCtrl => delete exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = notesCtrl;