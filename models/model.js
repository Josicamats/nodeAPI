'use strict'

var moment = require('moment')
const mongoose = require('mongoose')
var connection = require('./connection'),
    CryptoModel = () => {}

CryptoModel.getAll = (id, cb) => {
    var nid = new mongoose.Types.ObjectId(id)
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) cb(400,'Bad Request')
            if(countDocuments == 0)
            {
                let error = new Error(),
                locals = {
                             title: 'error 404',
                             description: 'ID no encontrado',
                             error: error
                         }
                         error.status = 404
                cb(404, locals)
            }
            else if(countDocuments == 1)
            {
                connection
                 .find({ _id : nid },{ _id: 0, balanceARS:0, balanceBTC: 0, __v: 0},(err, docs) => {
                    if(err) cb(400,'Bad Request')
                    cb(200, docs)
                })
            }
} )}

CryptoModel.getOne = (id, cb) => {
    var nid = new mongoose.Types.ObjectId(id)
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) cb(400,'Bad Request')
            if(countDocuments == 0)
            {
                let error = new Error(),
                locals = {
                             title: 'error 404',
                             description: 'ID no encontrado',
                             error: error
                         }
                         error.status = 404
                cb(404, locals)
            }
            else if(countDocuments == 1)
            {
                connection
                 .find({ _id : nid},{ _id: 0, transactions : 0,  __v: 0},(err, docs) => {
                    if(err) cb(400,'Bad Request')
                    cb(200, docs)
                })
            }
} )}



CryptoModel.save = (data, cb) => {
    var id = new mongoose.Types.ObjectId(data._id)
    var tid = new mongoose.Types.ObjectId()
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) cb(400,'Bad Request')
            if(countDocuments == 0)
            {
                var amount = parseFloat(data.amount)
                if(amount > 1000){
                    connection.create({_id : id, balanceARS : amount, balanceBTC : 0.00,  transactions : [{_id: tid, t_type: "DEPOSITO ARS", t_date: dateFormat('isoUtcDateTime'), t_amountARS: data.amount, t_amountBTC: 0} ] }, (err, docs) => {
                        if (err) cb(400,'Bad Request')
                        cb(201, docs)
                    })
                }
                else
                {
                    let error = new Error(),
                    locals = {
                                 title: 'error 400',
                                 description: 'No pueden realizar depositos menores a $1000 ars',
                                 error: error
                             }
                             error.status = 400
                    cb(400, locals)
                }
                
            }
            else if(countDocuments == 1)
            {
                var amount = parseFloat(data.amount)
                if(amount > 1000) {
                    connection.findOneAndUpdate({_id: id}, {$push: {transactions: {_id: tid, t_type: "DEPOSITO ARS", t_date: dateFormat('isoUtcDateTime'), t_amountARS: amount, t_amountBTC: 0}}, $inc: {balanceARS: amount}}, {useFindAndModify: false}, (err, docs) => {
                        if(err) cb(400,'Bad Request')
                        cb(200, docs)
                    })
                }
                else
                {
                    let error = new Error(),
                    locals = {
                                 title: 'error 400',
                                 description: 'No pueden realizar depositos menores a $1000 ars',
                                 error: error
                             }
                             error.status = 400
                    cb(400, locals)
                }
                
            }
        })            
}

CryptoModel.withdraw = (data, cb) => {
    var id = new mongoose.Types.ObjectId(data._id)
    var tid = new mongoose.Types.ObjectId()
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) cb(400,'Bad Request')
            if(countDocuments == 0)
            {
                    let error = new Error(),
                    locals = {
                                 title: 'error 404',
                                 description: 'El id ingresado no se encuentra',
                                 error: error
                             }
                             error.status = 404
                    cb(404, locals)
                
            }
            else if(countDocuments == 1)
            {
                var amount = parseFloat(data.amount)
                connection.find({ _id : id },{}).distinct('balanceARS', function (err, balance){
                    if(err) cb(400,'Bad Request')
                    var validateAmount = parseFloat(balance) - amount                         
                           if(validateAmount >= 0)
                           {
                            connection.findOneAndUpdate({_id: id}, {$push: {transactions: {_id: tid, t_type: "RETIRO ARS", t_date: dateFormat('isoUtcDateTime'), t_amountARS: amount, t_amountBTC: 0}}, $inc: {balanceARS: -amount}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs)
                            })
                            }
                            else
                             {
                                let error = new Error(),
                            locals = {
                                 title: 'error 406',
                                 description: 'Not Acceptable: No pueden realizar retiros mayores a tus fondos',
                                 error: error
                             }
                             error.status = 406
                            cb(406, locals)
                            }
                }) 
                
            }
        })            
}




CryptoModel.buyBTC = (data, cb) => {
    var id = new mongoose.Types.ObjectId(data._id)  
    var tid = new mongoose.Types.ObjectId()   
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) cb(400,'Bad Request')
            if(countDocuments == 0)
            {
                let error = new Error(),
                    locals = {
                                 title: 'error 404',
                                 description: 'El id ingresado no se encuentra',
                                 error: error
                             }
                             error.status = 404
                    cb(404, locals)
            }
            else if(countDocuments == 1)
            {
                var amountARS = parseFloat(data.amountARS)
                var amountBTC = parseFloat(data.amountBTC)
                connection.find({ _id : id },{}).distinct('balanceARS', function (err, balance){
                    if(err) cb(400,'Bad Request')
                    var validateAmount = parseFloat(balance) - amountARS                          
                           if(validateAmount >= 0)
                           {
                            connection.findOneAndUpdate({_id: id}, {$push: {transactions: {_id: tid, t_type: "COMPRA BTC", t_date: dateFormat('isoUtcDateTime'), t_amountARS: amountARS, t_amountBTC: amountBTC}}, $inc: {balanceARS : -amountARS, balanceBTC: amountBTC}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs)
                            })
                            }
                            else
                             {
                                let error = new Error(),
                            locals = {
                                 title: 'error 406',
                                 description: 'Not Acceptable: No pueden realizar compras mayores a tus fondos',
                                 error: error
                             }
                             error.status = 406
                            cb(406, locals)
                            }
                })                    
            }
        })            
}

CryptoModel.sellBTC = (data, cb) => {
    var id = new mongoose.Types.ObjectId(data._id)  
    var tid = new mongoose.Types.ObjectId()   
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) cb(400,'Bad Request')
            if(countDocuments == 0)
            {
                let error = new Error(),
                    locals = {
                                 title: 'error 404',
                                 description: 'El id ingresado no se encuentra',
                                 error: error
                             }
                             error.status = 404
                    cb(404, locals)
            }
            else if(countDocuments == 1)
            {
                var amountARS = parseFloat(data.amountARS)
                var amountBTC = parseFloat(data.amountBTC) 
                //amountBTC = Math.abs(amountBTC)
                connection.find({ _id : id },{}).distinct('balanceBTC', function (err, balance){
                    if(err) cb(400,'Bad Request')
                    var validateAmount = parseFloat(balance) - amountBTC                          
                           if(validateAmount >= 0)
                           {
                            connection.findOneAndUpdate({_id: id}, {$push: {transactions: {_id: tid, t_type: "VENTA BTC", t_date: dateFormat('isoUtcDateTime'), t_amountARS: amountARS, t_amountBTC: amountBTC}}, $inc: {balanceARS : amountARS, balanceBTC: -amountBTC}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs)
                            })
                            }
                            else
                             {
                                let error = new Error(),
                            locals = {
                                 title: 'error 406',
                                 description: 'Not Acceptable: No pueden realizar ventas mayores a tus fondos',
                                 error: error
                             }
                             error.status = 406
                            cb(406, locals)
                            }
                })    
                                   
            }
        })            
}

CryptoModel.delete = (ids, cb) => {
    var id1 = new mongoose.Types.ObjectId(ids.id)
    var id2 = new mongoose.Types.ObjectId(ids.tid) 
    connection
        .countDocuments({"transactions._id": id2})  
        .exec((err, countDocuments) => {
            if(err) throw err
            if(countDocuments == 0)
            {
                let error = new Error(),
                    locals = {
                                 title: 'error 400',
                                 description: 'El id no fue encontrado',
                                 error: error
                             }
                             error.status = 404
                    cb(404, locals)
            }
            else if(countDocuments == 1)
            {
                connection.find({"transactions._id": id2},{}).distinct('transactions.t_type', function (err, type){
                    if(err) cb(400,'Bad Request')
                    var type = type.pop()
                    console.log(type)
                    connection.find({ _id : id1 },{}).distinct('transactions.t_amountARS', function (err, ars){
                        if(err) cb(400,'Bad Request')
                        connection.find({ _id : id1 },{}).distinct('transactions.t_amountBTC', function (err, btc){
                            if(err) cb(400,'Bad Request')
                            connection.find({"transactions._id": id2},{}).distinct('transactions.t_date', function (err, tdate){
                                if(err) cb(400,'Bad Request')
                            
                         var amountars = parseFloat(ars)
                         var amountbtc = parseFloat(btc)

                    var m = moment().diff(tdate.pop(), 'minutes')
                    if(m > 5)
                    {
                        let error = new Error(),
                          locals = {
                                 title: 'error 403',
                                 description: 'Forbidden: No puedes eliminar las transacciones luego de 5 minutos',
                                 error: error
                             }
                             error.status = 403
                             cb(403, locals)
                    }
                    else
                     {
                        if(type === 'COMPRA BTC')
                        {
                            connection.findOneAndUpdate({_id: id1},{ $pull: {transactions: {_id: id2}}, $inc: {balanceARS : amountars, balanceBTC: -amountbtc}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs) 
                            })
                        }
                        else if(type  === 'VENTA BTC')
                        {
                            connection.findOneAndUpdate({_id: id1},{ $pull: {transactions: {_id: id2}}, $inc: {balanceARS : -amountars, balanceBTC: amountbtc}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs) 
                            })
                        }
                        else if(type === 'DEPOSITO ARS')
                        {
                            connection.findOneAndUpdate({_id: id1},{ $pull: {transactions: {_id: id2}}, $inc: {balanceARS : -amountars}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs) 
                            })
                        }
                        else if(type === 'RETIRO ARS')
                        {
                            connection.findOneAndUpdate({_id: id1},{ $pull: {transactions: {_id: id2}}, $inc: {balanceARS : amountars,}}, {useFindAndModify: false}, (err, docs) => {
                                if(err) cb(400,'Bad Request')
                                cb(200, docs) 
                            })
                        }
                    }
                
                     })
                })
            })
        })                
            }
        })
}

module.exports = CryptoModel