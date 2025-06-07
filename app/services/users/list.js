'use strict';

const operations = require('../../config/db/operations');

module.exports = class ListService {

    async process(req, res) {

        try {

         console.log('ListService - process - Listado de usuarios');

        const entry = {
            user: req.body.user,
            role: req.body.role,      // Nuevo campo
            cedula: req.body.cedula, // Nuevo campo
            state: req.body.state,
            page: req.body.page
        };

        const filter = this.buildFilter(entry);

        let { total_registros, total_paginas, users } = await this.getUsers(entry.page, filter);

        return res.status(200).json({
            value: users,
            total_registros,
            total_paginas
        });
        
        } catch (error) {

            console.error('ListService - process - Error en el listado de usuarios', error);
            throw error;
        }
    }

    buildFilter(entry) {

        try {  

        let filter = {};

        if (entry.user) {
            const partialUsernameRegex = new RegExp(entry.user, 'i');
            filter["user"] = partialUsernameRegex;
        }
        
        if (entry.cedula) {
            const partialCedulaRegex = new RegExp(entry.cedula, 'i');
            filter["cedula"] = partialCedulaRegex;
        }

        if (entry.role) {
            filter["role"] = entry.role;
        }

        if (entry.state)
            filter["state"] = entry.state;

        return filter;

        } catch(error) {

            console.error('ListService - buildFilter - Error al construir el filtro', error);
            throw error;
        }
    }

    async getUsers(page, filter) {
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
        const users = await operations.findMany('users', filter, {}, { limit, skip });

        return {
            total_registros,
            total_paginas,
            users
        }

        }catch (error) {

            console.error('ListService - getUsers - Error al obtener los usuarios', error);
            throw error;
        }
    }
}
