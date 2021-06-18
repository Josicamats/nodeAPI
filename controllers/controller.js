'use strict'

var validator = require('validator');
var CryptoModel = require('../models/model'),
    CryptoController = () => {}


CryptoController.getOne = (req, res, next) => 
{
    let id = req.query.id
    try{
        var validate_id = !validator.isEmpty(req.query.id);
        var is_id = validator.isMongoId(req.query.id);
    }catch(err){
        let error = new Error(),
            locals = {
                title: 'error 404',
                description: 'Validation Error',
                error: error
            }
        error.status = 404
        res.status(404).send(locals)
    }
    if(!is_id)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(validate_id){
        CryptoModel.getOne(id, (cod, docs) => {
            
            let locals = {
                 title : 'Saldo de cuenta:',
                 data: docs
                           }
            res.status(cod).send(locals)
     })
    }
    else
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'El id no puede ir vacio',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
    }
    
}

CryptoController.getAll = (req, res, next) => 
{
    let id = req.query.id
    try{
        var validate_id = !validator.isEmpty(req.query.id);
        var is_id = validator.isMongoId(req.query.id);
    }catch(err){
        let error = new Error(),
            locals = {
                title: 'error 404',
                description: 'Validation Error',
                error: error
            }
        error.status = 404
        res.status(404).send(locals)
    }
    if(!is_id)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(validate_id)
    {
        CryptoModel.getAll(id,(cod, docs) => {
        
            let locals = {
                title : 'Lista de Transacciones',
                data: docs
                       }
           res.status(cod).send(locals)
   })
    }
    else
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'El id puede ir vacio',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
    }
}


CryptoController.save = (req, res, next) => 
{
    let deposit = {
        _id : req.body._id,
        amount : req.body.amount  
   }
   try
   {
    var validate_id = !validator.isEmpty(req.body._id);
    var validate_amount = !validator.isEmpty(req.body.amount);
    var is_id = validator.isMongoId(req.body._id);
    
    }
    catch(err)
    {
    let error = new Error(),
        locals = {
            title: 'error 404',
            description: 'Validation Error',
            error: error
        }
    error.status = 404
    res.status(404).send(locals)
    }
    if(!is_id)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(!validate_id||!validate_amount)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'Faltan datos',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else
    {
        CryptoModel.save(deposit, (cod, msg) => res.status(cod).send(msg))
    }
   
}

CryptoController.withdraw = (req, res, next) => 
{
    let withdraw = {
        _id : req.body._id,
        amount : req.body.amount  
   }
   try
   {
    var validate_id = !validator.isEmpty(req.body._id);
    var validate_amount = !validator.isEmpty(req.body.amount);
    var is_id = validator.isMongoId(req.body._id);
    }
    catch(err)
    {
    let error = new Error(),
        locals = {
            title: 'error 404',
            description: 'Validation Error',
            error: error
        }
    error.status = 404
    res.status(404).send(locals)
    }
    if(!is_id)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(!validate_id||!validate_amount)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'Faltan datos',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else
    {
        CryptoModel.withdraw(withdraw, (cod, msg) => res.status(cod).send(msg))
    }
   
}

CryptoController.buyBTC = (req, res, next) => 
{
    let buy = {
        _id : req.body._id,
        amountARS : req.body.amountARS,
        amountBTC : req.body.amountBTC   
   }
   try
   {
    var validate_id = !validator.isEmpty(req.body._id);
    var validate_amountARS = !validator.isEmpty(req.body.amountARS);
    var validate_amountBTC = !validator.isEmpty(req.body.amountBTC);
    var is_id = validator.isMongoId(req.body._id);
    }
    catch(err)
    {
    let error = new Error(),
        locals = {
            title: 'error 404',
            description: 'Validation Error',
            error: error
        }
    error.status = 404
    res.status(404).send(locals)
    }
    if(!is_id)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(!validate_id||!validate_amountARS||!validate_amountBTC)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'Faltan datos',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else
    {
        CryptoModel.buyBTC(buy, (cod, msg) => res.status(cod).send(msg))
    }
}


CryptoController.sellBTC = (req, res, next) => 
{
    let sell = {
        _id : req.body._id,
        amountARS : req.body.amountARS,
        amountBTC : req.body.amountBTC   
   }
   try
   {
    var validate_id = !validator.isEmpty(req.body._id);
    var validate_amountARS = !validator.isEmpty(req.body.amountARS);
    var validate_amountBTC = !validator.isEmpty(req.body.amountBTC);
    var is_id = validator.isMongoId(req.body._id);
    }
    catch(err)
    {
    let error = new Error(),
        locals = {
            title: 'error 404',
            description: 'Validation Error',
            error: error
        }
    error.status = 404
    res.status(404).send(locals)
    }
    if(!is_id)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(!validate_id||!validate_amountARS||!validate_amountBTC)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'Faltan datos',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else
    {
        CryptoModel.sellBTC(sell, (cod, msg) => res.status(cod).send(msg))
    }
}

CryptoController.delete = (req, res, next) => 
{
    let ids = {
        id : req.query.id,
        tid : req.query.tid
    }
    try
   {
    var validate_id = !validator.isEmpty(req.query.id);
    var validate_tid = !validator.isEmpty(req.query.tid);
    var is_id = validator.isMongoId(req.query.id);
    var is_tid = validator.isMongoId(req.query.tid);
    }
    catch(err)
    {
    let error = new Error(),
        locals = {
            title: 'error 404',
            description: 'Validation Error',
            error: error
        }
    error.status = 404
    res.status(404).send(locals)
    }
    if(!is_id||!is_tid)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'No es un id de mongoDB',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else if(!validate_id||!validate_tid)
    {
        let error = new Error(),
            locals = {
                title: 'error 400',
                description: 'Faltan datos',
                error: error
            }
        error.status = 400
        res.status(400).send(locals)
        
    }
    else
    {
        CryptoModel.delete(ids, (cod, msg) => res.status(cod).send(msg))
    }  
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