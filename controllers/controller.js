'use strict'

var CryptoModel = require('../models/model'),
    CryptoController = () => {}


CryptoController.getOne = (req, res, next) => 
{
    let id = req.params.id
    CryptoModel.getOne(id, (docs) => {
            
            let locals = {
                 title : 'Saldo de cuenta:',
                 data: docs
                           }
            res.send(locals)
     })
}

CryptoController.getAll = (req, res, next) => 
{
    CryptoModel.getAll((docs) => {
        
             let locals = {
                 title : 'Lista de cuenta',
                 data: docs
                        }
            res.send(locals)
    })
}


CryptoController.save = (req, res, next) => 
{
    console.log(req.body)
    let deposit = {
        _id : req.body._id,
        amount : req.body.amount  
   }
   console.log(deposit)

   CryptoModel.save(deposit, () => res.send(`El deposito se realizó correctamente`))
}

CryptoController.delete = (req, res, next) => 
{
    let _id = req.params._id
    console.log(_id)

    CryptoModel.delete(_id, () => res.redirect('/'))

}

CryptoController.addForm = (req, res, next) => 
{
    res.send( { title: 'Agregar Cryptomoneda'} ) 
}

CryptoController.error404 = (req, res, next) => 
{
    let error = new Error(),
            locals = {
                title: 'error 404',
                description: 'Recurso no encontrado',
                error: error
            }
        error.status = 404
        res.status(404).send(locals)
        next()
}

module.exports = CryptoController