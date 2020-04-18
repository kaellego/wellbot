const express = require('express');
const NodeCache = require( "node-cache" );
const { Client } = require('whatsapp-web.js');

const app = express();
const client = new Client();
const cache = new NodeCache();

client.initialize();

app.get('/', async function (req, res) {
    res.send('Hello World!');
});

app.get('/qr', async function (req, res, next) {
    value = cache.get('qr');
    if ( value == undefined || !req.query.f == undefined){
        client.on('qr', (qr) => {
            if(qr){
                json = {
                    'qr': qr,
                    'imgqr': encodeURI('https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + qr )
                };
                cache.set( 'qr', json, 20000);
                return res.json(json);
            }
        }).catch(next);
        return res.status(400).send({
            "status": "ERROR",
            "message": "Erro ao retornar o QR"
        });
    }
    return res.json(value);
});

app.get('/auth', function (req, res, next) {
    value = cache.get('session');
    if ( value == undefined){
        client.on('authenticated', (session) => {
            if(session){
                cache.set( 'session', session);
                //JSON.stringify(session)
                return res.json(session);
            }
        });
        return res.status(400).send({
            "status": "ERROR",
            "message": "Não existe sessão"
        });
    }
    return res.json(value);
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});