const NodeCache = require('node-cache');
const { Client } = require('whatsapp-web.js');
const cache = new NodeCache();
const client = new Client();
client.initialize();

module.exports = {
    async index(req, res){
        return res.send('Hello World!');
    },

    async qr(req, res){
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
            });
            return res.status(400).send({
                "status": "ERROR",
                "message": "Erro ao retornar o QR"
            });
        }
        return res.json(value);
    },

    async auth(req, res){
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
    }
};