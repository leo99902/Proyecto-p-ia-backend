'use strict';

const CreateService = require('../services/users/create');
const ListService = require('../services/users/list');
const GetService = require('../services/users/get');
const EditService = require('../services/users/edit');
const DeleteService = require('../services/users/delete');

const usersCtrl = {};

usersCtrl.create = async (req, res) => {

    try {

        console.log('usersCtrl [create]');

        const createService = new CreateService();
        await createService.process(req, res);
    } catch (ex) {

        console.log('Exception usersCtrl [create]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

usersCtrl.get = async (req, res) => {

    try {

        console.log('usersCtrl [get]');

        const getService = new GetService();
        await getService.process(req, res);
    } catch (ex) {

        console.log('Exception usersCtrl [get]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

usersCtrl.edit = async (req, res) => {

    try {

        console.log('usersCtrl [edit]');

        const editService = new EditService();
        await editService.process(req, res);
    } catch (ex) {

        console.log('Exception usersCtrl [edit]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

usersCtrl.list = async (req, res) => {

    try {

        console.log('usersCtrl [list]');

        const listService = new ListService();
        await listService.process(req, res);
    } catch (ex) {

        console.log('Exception usersCtrl [list]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

usersCtrl.delete = async (req, res) => {

    try {

        console.log('usersCtrl [delete]');

        const deleteService = new DeleteService();
        await deleteService.process(req, res);
    } catch (ex) {

        console.log('Exception usersCtrl [delete]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

module.exports = usersCtrl;
