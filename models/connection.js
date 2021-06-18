'use strict'

const mongoose = require ('mongoose')
const conf = require('./db-conf')
const {Schema} = mongoose
const AccountSchema = new Schema({
        _id : String,
        balanceARS: Number,
        balanceBTC : Number,
        transactions:[ {
            _id : String,
            t_type : String,
            t_date: Date,
            t_amountARS: Number,
            t_amountBTC: Number
        }
    ],
    },
    {
        collection : "accounts"
    }),
    CryptoModel = mongoose.model('Account', AccountSchema)
   

//'mongodb://localhost:27017/exchange'
//`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`
//mongoose.connect(`mongodb:\/\/${conf.mongo.host}/${conf.mongo.db}`, { useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connect(process.env.MONGODB_URI,
{ useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>{ return console.log(`Connected to database:${process.env.MONGODB_DB} on host: ${process.env.MONGODB_URI}`)
 })
.catch(err => console.log(`Could not connect to database: ${process.env.MONGODB_DB} on host: ${process.env.MONGODB_URI}`,err))


module.exports = CryptoModel