'use strict'

const mongoose = require('mongoose')
var connection = require('./connection'),
    CryptoModel = () => {}

CryptoModel.getAll = (cb) => {
    connection
         .find({},{ _id: 0, __v: 0})
         .exec((err, docs) => {
                    if(err) throw err
                    cb(docs)
                })
}

CryptoModel.getOne = (id, cb) => {
    var nid = new mongoose.Types.ObjectId(id)
    connection
         .find({ _id : nid},{ _id: 0, __v: 0})
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
                var idC = new mongoose.Types.ObjectId()
                connection.create({_id : idC, balanceARS : data.amount, balanceBTC : 0.00}, (err) => {
                        if (err) throw err
                        cb()
                    })
            }
            else if(countDocuments == 1)
            {
                var amount = parseFloat(data.amount)
                console.log(`${amount}`)
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