
const CreateService = require('../services/users/create');
const ListService = require('../services/users/list');
const GetService = require('../services/users/get');
const EditService = require('../services/users/edit');


const usersCtrl = {

    // create users
    create: async (req, res) => {
        try {

            console.log('usersCtrl => create ');
            await new CreateService().process(req, res);
        } catch (ex) {
            console.log('usersCtrl => create exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // get users
    get: async (req, res) => {
        try {
            console.log('usersCtrl => get');
            await new GetService().process(req, res);
        } catch (ex) {
            console.log('usersCtrl => get exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // edit users
    edit: async (req, res) => {
        try {
            console.log('usersCtrl => edit');
            await new EditService().process(req, res);
        } catch (ex) {
            console.log('usersCtrl => edit exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // list users
    list: async (req, res) => {
        try {
            console.log('usersCtrl => list');
            await new ListService().process(req, res);
        } catch (ex) {
            console.log('usersCtrl => list exception: ', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = usersCtrl;
