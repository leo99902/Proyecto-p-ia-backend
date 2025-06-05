'use strict';

const authCtrl = require('../controller/auth');
const usersCtrl = require('../controller/users');

const { token } = require('./token');

exports.initializeRoutes = app => {

    // Auth
    app.post('/login', (req, res, next) => {
        authCtrl.login(req, res);
    });

    app.post('/recoverPassword', (req, res, next) => {
        authCtrl.recoverPassword(req, res);
    });

    app.post('/changePassword', token, (req, res, next) => {
        authCtrl.changePassword(req, res);
    });


    // User
    app.post('/createUser', token, (req, res, next) => {
        usersCtrl.create(req, res);
    });

    app.post('/getUser', token, (req, res, next) => {
        usersCtrl.get(req, res);
    });

    app.post('/editUser', token, (req, res, next) => {
        usersCtrl.edit(req, res);
    });

    app.post('/listUsers', token, (req, res, next) => {
        usersCtrl.list(req, res);
    });

    app.post('/deleteUser', token, (req, res, next) => {
        usersCtrl.delete(req, res);
    });

}