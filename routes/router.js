'use strict'

var CryptoController = require('../controllers/controller'),
    express = require('express'),
    router = express.Router()


router 
        .get('/', (err, res) => {
        	res.status(200);
	        res.json({ working: true });
	        res.end();
        })
        .get('/lista', CryptoController.getAll)
        //.get('/agregar', CryptoController.addForm)
        .post('/cuentas', CryptoController.save)
        .get('/cuentas/saldo/:id', CryptoController.getOne)
        .patch('/cuentas', CryptoController.save)
        .put('/cuentas', CryptoController.save)
        //Este no creo que lo utilicemos -> .delete('/eliminar/:id', CryptoController.delete)
        //.use(CryptoController.error404)
        .get('/btcvalue/:ids&:currency', function(req, res){
            let options = {
                url: 'https://api.coingecko.com/api/v3/simple/price?ids='+req.params.ids+'&vs_currencies='+req.params.currency
            };
            request(options).pipe(res);
        });


module.exports = router