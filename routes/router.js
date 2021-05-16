'use strict'

var CryptoController = require('../controllers/controller'),
    express = require('express'),
    router = express.Router()

router 
        .get('/lista', CryptoController.getAll)
        //.get('/agregar', CryptoController.addForm)
        .post('/cuentas', CryptoController.save)
        .get('/cuentas/saldo/:id', CryptoController.getOne)
        .patch('/cuentas', CryptoController.save)
        .put('/cuentas', CryptoController.save)
        //Este no creo que lo utilicemos -> .delete('/eliminar/:id', CryptoController.delete)
        .use(CryptoController.error404)

module.exports = router