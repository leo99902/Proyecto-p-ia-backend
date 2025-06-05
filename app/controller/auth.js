'use strict';

const AuthSessionHandler = require('../services/auth/login');

const authCtrl = {};

authCtrl.login = async (req, res) => {

    try {

        console.log('AuthSessionHandler');

        const authSessionHandler = new AuthSessionHandler();
        await authSessionHandler.authenticate(req, res);
    } catch (ex) {

        console.log('Exception authCtrl [login]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

module.exports = authCtrl; 