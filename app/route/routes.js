'use strict';

const authenticationCtrl = require('../controller/authentication');
const usersCtrl = require('../controller/users');

const { token } = require('./token');

exports.initializeRoutes = app => {

    // Auth
    app.post('/login', (req, res, next) => {
        authenticationCtrl.login(req, res);
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