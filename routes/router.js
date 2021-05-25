'use strict'

var CryptoController = require('../controllers/controller'),
    express = require('express'),
    router = express.Router()


router 
        .get('/status', (req, res) => {
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
        //Este no creo que lo utilicemos -> .delete('/:id', CryptoController.delete)
        .get('/cyptos/:ids&:currency', function(req, res){
            let options = {
                url: 'https://api.coingecko.com/api/v3/simple/price?ids='+req.params.ids+'&vs_currencies='+req.params.currency
            }
            request(options).pipe(res);
        })
        .get('/time', function(req, res) {

            let d ={
                date : dateFormat('dd/mm/yyyy HH:MM')
            } 
            res.send(d);
        })




        //.use(CryptoController.error404)       

module.exports = router