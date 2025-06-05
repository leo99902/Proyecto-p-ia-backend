'use strict';

const AuthSessionHandler = require('../services/auth/login');
const authenticationCtrl = {};
authenticationCtrl.login = async (req, res) => {

    try {
        console.log('AuthSessionHandler');

        const authSessionHandler = new AuthSessionHandler();
        await authSessionHandler.process(req, res);
    } catch (ex) {
        
        console.log('AuthSessionHandler', ex);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

module.exports = authenticationCtrl; 