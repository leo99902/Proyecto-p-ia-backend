'use strict';

const authCtrl = require('../controller/auth');
const usersCtrl = require('../controller/users');

const { tokenValidator } = require('./token-validator');

exports.initializeRoutes = app => {

    // Auth
    app.post('/login', (req, res, next) => {
        authCtrl.login(req, res);
    });

    app.post('/recoverPassword', (req, res, next) => {
        authCtrl.recoverPassword(req, res);
    });

    app.post('/changePassword', tokenValidator, (req, res, next) => {
        authCtrl.changePassword(req, res);
    });


    // User
    app.post('/createUser', tokenValidator, (req, res, next) => {
        usersCtrl.create(req, res);
    });

    app.post('/getUser', tokenValidator, (req, res, next) => {
        usersCtrl.get(req, res);
    });

    app.post('/editUser', tokenValidator, (req, res, next) => {
        usersCtrl.edit(req, res);
    });

    app.post('/listUsers', tokenValidator, (req, res, next) => {
        usersCtrl.list(req, res);
    });

    app.post('/deleteUser', tokenValidator, (req, res, next) => {
        usersCtrl.delete(req, res);
    });

}