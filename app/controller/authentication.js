const AuthSessionHandler = require('../services/auth/login');
const PasswordResetService = require('../services/auth/reset-password');
const RenewPasswordService = require('../services/auth/renew-password');

const authenticationController = {

    // Login
    login: async (req, res) => {
        try {
            console.log('AuthSessionHandler => login');
            await new AuthSessionHandler().process(req, res);
        } catch (error) {
            console.log('AuthSessionHandler => login exception', error);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // Password Reset 
    passwordReset: async (req, res) => {
        try {
            console.log('PasswordResetService => recoverPassword');
            await new PasswordResetService().process(req, res);
        } catch (error) {
            console.log('PasswordResetService => recoverPassword exception', error);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    },

    // Renew Password 
    renewPassword: async (req, res) => {
        try {
            console.log('RenewPasswordService => renewPassword');
            await new RenewPasswordService().process(req, res);
        } catch (error) {
            console.log('RenewPasswordService => renewPassword exception', error);
            res.status(500).json({ error: 'Ocurrio un error' });
        }
    }
};

module.exports = authenticationController;