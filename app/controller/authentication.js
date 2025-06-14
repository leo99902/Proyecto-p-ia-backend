'use strict';

const AuthSessionHandler = require('../services/auth/login');

const authenticationCtrl = {

    // Login
    login: async (req, res) => {
        try {
            console.log('AuthSessionHandler => login');
            await new AuthSessionHandler().process(req, res);
        } catch (ex) {
            console.log('AuthSessionHandler => login exception', ex);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = authenticationCtrl;