'use stricts'

const express = require('express')
const url = require('url')
const querystring = require('querystring')
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

module.exports = app