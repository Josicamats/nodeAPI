'use strict'

var cors = require('cors')
var  corsOptions = {
    origin: "*",
    methods: "*",
    exposedHeaders: "*",
    allowedHeaders: "*, Authorization"
  }
var CryptoController = require('../controllers/controller'),
    express = require('express'),
    router = express.Router()
 
router 
        .get('/status',cors(), (req, res) => {
        	res.status(200);
	        res.json({ working: true });
	        res.end();
        })
        .get('/transacciones/', cors(), CryptoController.getAll)  
        .post('/cuentas/depositoars', cors(), CryptoController.save)
        .options('/cuentas/retiroars', cors())
        .patch('/cuentas/retiroars', cors(corsOptions), CryptoController.withdraw)
        //.post('/cuentas/cashin', cors(), CryptoController.buy)
        //.post('/cuentas/cashout', cors(), CryptoController.sell)
        .options('/cuentas/comprabtc', cors())
        .put('/cuentas/comprabtc', cors(), CryptoController.buyBTC)
        .options('/cuentas/ventabtc', cors())
        .put('/cuentas/ventabtc', cors(), CryptoController.sellBTC)
        .get('/cuentas/saldo/', cors(), CryptoController.getOne)
        .options('/cuentas/depositoars', cors())
        .put('/cuentas/depositoars', cors(corsOptions),CryptoController.save)
        .options('/cuentas/depositoars', cors())
        .patch('/cuentas/depositoars', cors(corsOptions),CryptoController.save)
        .options('/transacciones/', cors())
        .delete('/transacciones/', cors(), CryptoController.delete)
        .get('/value2/', cors(), function(req, res){
            let options = {
                url: 'https://api.coingecko.com/api/v3/simple/price?ids='+req.query.ids+'&vs_currencies='+req.query.currency
            }
             request(options).pipe(res);
        })
        .get('/value', cors(), function(req, res){
            let options = {
                url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=ars'
            }
            request(options).pipe(res)         
        })
        .get('/time',cors(), function(req, res) {

            let d ={
                date : dateFormat('dd/mm/yyyy HH:MM')
            } 
            res.send(d);
        })




        .use(CryptoController.error404)       

module.exports = router