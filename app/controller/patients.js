'use strict';

const CreateService = require('../services/patients/create');
const ListService = require('../services/patients/list');
const GetService = require('../services/patients/get');
const EditService = require('../services/patients/edit');

const patientsCtrl = {

    // Create patients
    create: async (req, res) => {
        try {
            console.log('patientsCtrl => create');
            await new CreateService().process(req, res);
        } catch (ex) {
            console.log('patientsCtrl => create exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // get patients
    get: async (req, res) => {
        try {
            console.log('patientsCtrl => get');
            await new GetService().process(req, res);
        } catch (ex) {
            console.log('patientsCtrl => get exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // edit patients
    edit: async (req, res) => {
        try {
            console.log('patientsCtrl => edit');
            await new EditService().process(req, res);
        } catch (ex) {
            console.log('patientsCtrl => edit exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // list patients
    list: async (req, res) => {
        try {
            console.log('patientsCtrl => list');
            await new ListService().process(req, res);
        } catch (ex) {
            console.log('patientsCtrl => list exception:', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = patientsCtrl;