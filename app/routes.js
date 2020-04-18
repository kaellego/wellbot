const QrController = require('./controllers/QrController');
const WppController = require('./controllers/WppController');
const express = require('express');
const routes = express.Router();

//QR
routes.get('/qr', QrController.index);
routes.get('/qr/:text', QrController.show)

//WPP
routes.get('/wpp', WppController.index);
routes.get('/wpp/qr', WppController.qr);
routes.get('/wpp/auth', WppController.auth);
routes.get('/wpp/ready', WppController.ready);
routes.get('/wpp/messaget', WppController.messaget);
routes.get('/wpp/messaget1', WppController.messaget1);
routes.get('/wpp/disconnected', WppController.disconnected);

module.exports = routes;