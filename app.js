'use stricts'

const express = require('express')
global.fetch = require("node-fetch")
global.request = require('request')
global.got = require('got')
global.dateFormat = require('dateformat')
require('dotenv').config()

const
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    restFul = require('express-method-override')('_method'),
    routes = require('./routes/router'),
    faviconURL = `${__dirname}/public/img/coins.png`,
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000),
    cors = require('cors'),
    app = express()

app
    //Configurando App
    .set('views', viewDir)
    .set('port', port)
    //ejecutando middlewares
    .use( favicon(faviconURL))
    .use( express.json() )
    .use(express.urlencoded({extended: true}))
    .use(restFul)
    .use( morgan('dev') )
    //ejecuto enrutador
    .use(publicDir)
    .use(routes)

    //enable cors
    app.use(cors());

    
module.exports = app