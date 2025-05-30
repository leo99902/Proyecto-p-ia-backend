'use strict';

const LoginService = require('../services/auth/login');

const authCtrl = {};

authCtrl.login = async (req, res) => {

    try {

        console.log('authCtrl [login]');

        const loginService = new LoginService();
        await loginService.process(req, res);
    } catch (ex) {

        console.log('Exception authCtrl [login]: ', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

module.exports = authCtrl; 