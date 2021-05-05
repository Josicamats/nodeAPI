'use strict'

const mongoose = require('mongoose')
var connection = require('./connection'),
    CryptoModel = () => {}

CryptoModel.getAll = (cb) => {
    connection
         .find()
         .exec((err, docs) => {
                    if(err) throw err
                    cb(docs)
                })
}

CryptoModel.getOne = (id, cb) => {
    connection
        .findOne({_id : id})
        .exec((err, docs) => {
            if(err) throw err
            cb(docs)
        })
}


CryptoModel.save = (data, cb) => {
    var id = new mongoose.Types.ObjectId(data._id)
    connection
        .countDocuments({_id : id})  
        .exec((err, countDocuments) => {
            if(err) throw err
            console.log(`Cantidad de documentos: ${countDocuments}`)

            if(countDocuments == 0)
            {
                var id = new mongoose.Types.ObjectId()
                connection.create({_id : id, balanceARS : data.amount, balanceBTC : 0.00}, (err) => {
                        if (err) throw err
                        cb()
                    })
            }
            else if(countDocuments == 1)
            {
                var amount = parseFloat(data.amount)
                //console.log(`${amount}`)
                connection.findOneAndUpdate({_id : id}, { $inc : { balanceARS : amount } }, {useFindAndModify: false}, (err) => {
                    if(err) throw err
                    cb()
                })
            }
        })            
}

CryptoModel.delete = (id, cb) => {
    connection.remove({_id : id }, (err, docs) => {
        if(err) throw err
        cb()
    })
}


module.exports = CryptoModel