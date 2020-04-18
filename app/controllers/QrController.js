const QRCode = require('qrcode');
//const helper = require('../helpers/img');

module.exports = {
    async index(req, res){
        return res.send('Hello QR!');
    },

    async show(req, res){
        //console.log(req.params.text);
        //data = encodeURIComponent(req.params.text);
        QRCode.toString(req.params.text, {type:'svg', color: { dark:"#122e31", light:"##ffffff" }}, function (err, content) {
            res.writeHead(200,{'Content-type':'image/svg+xml'});
            res.end(content);
        });
        //return res.send(url);
    }
};