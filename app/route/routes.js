
const authenticationCtrl = require('../controller/authentication');
const usersCtrl = require('../controller/users');
const patientsCtrl = require('../controller/patients');
const notesCtrl = require('../controller/notes');
const geminiCtrl = require('./gemini');

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

    // Notes
    app.post('/createNote', token, (req, res) => {
        notesCtrl.create(req, res);
    });

    app.post('/listNotes', token, (req, res) => {
        notesCtrl.list(req, res);
    });

    app.post('/deleteNote', token, (req, res) => {
        notesCtrl.delete(req, res);
    });

    // Gemini
    app.post('/gemini/generate', (req, res) => {
        geminiCtrl.generate(req, res);
    });

    app.post('/gemini/history', (req, res) => {
        geminiCtrl.history(req, res);
    });
}