const express = require('express');
const routes = express.Router();
const WppController = require('./controllers/WppController');

routes.get('/wpp', WppController.index);
routes.get('/wpp/qr', WppController.qr);
routes.get('/wpp/auth', WppController.auth);

module.exports = routes;