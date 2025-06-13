'use strict';

const operations = require('../../config/db/operations');

module.exports = class ListService {

    async process(req, res) {
        try {
            console.log('ListService - process - Listado de pacientes');

            const entry = {
                name: req.body.name,
                cedula: req.body.cedula,
                state: req.body.state,
                page: req.body.page || 1
            };

            const filter = this.buildFilter(entry);

            let { total_registros, total_paginas, patients } = await this.getPatients(entry.page, filter);

            return res.status(200).json({
                value: patients,
                total_registros,
                total_paginas
            });

        } catch (error) {
            console.error('ListService - process - Error al listar pacientes', error);
            throw error;
        }
    }

    buildFilter(entry) {
        try {
            let filter = {};

            filter["role"] = { $in: ["Paciente"] };

            if (entry.name) {
                filter["name"] = new RegExp(entry.name, 'i');
            }
            if (entry.cedula) {
                filter["cedula"] = new RegExp(entry.cedula, 'i');
            }

            if (entry.state) {
                filter["state"] = entry.state;
            }

            return filter;
        } catch (error) {
            console.error('ListService - buildFilter - Error al construir el filtro', error);
            throw error;
        }
    }

    async getPatients(page, filter) {
        try {
            const limit = 8;
            let skip = 0;
            let total_registros = 0;
            let total_paginas = 0;

            if (page > 1)
                skip = ((page - 1) * limit);

            const value = await operations.countDocuments('users', filter);

            total_registros = value;
            total_paginas = Math.ceil(total_registros / limit);
            const patients = await operations.findMany('users', filter, {}, { limit, skip });

            return {
                total_registros,
                total_paginas,
                patients
            }

        } catch (error) {
            console.error('ListService - getPatients - Error al obtener los pacientes', error);
            throw error;
        }
    }
}