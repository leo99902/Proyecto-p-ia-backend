
const authenticationCtrl = require('../controller/authentication');
const usersCtrl = require('../controller/users');
const patientsCtrl = require('../controller/patients');

const { token } = require('./token');

exports.initializeRoutes = app => {

    // Auth
    app.post('/login', (req, res) => {
        authenticationCtrl.login(req, res);
    });
     app.post('/recoverPassword', (req, res) => {
        authenticationCtrl.passwordReset(req, res);
    });

      app.post('/renewPassword', token, (req, res) => {
        authenticationCtrl.renewPassword(req, res);
    });

    // User
    app.post('/createUser', token, (req, res) => {
        usersCtrl.create(req, res);
    });

    app.post('/getUser', token, (req, res) => {
        usersCtrl.get(req, res);
    });

    app.post('/editUser', token, (req, res) => {
        usersCtrl.edit(req, res);
    });

    app.post('/listUsers', token, (req, res) => {
        usersCtrl.list(req, res);
    });

    // Patients
    app.post('/createPatient', token, (req, res) => {
        patientsCtrl.create(req, res);
    });

    app.post('/getPatient', token, (req, res) => {
        patientsCtrl.get(req, res);
    });

    app.post('/editPatient', token, (req, res) => {
        patientsCtrl.edit(req, res);
    });

    app.post('/listPatients', token, (req, res) => {
        patientsCtrl.list(req, res);
    });
}