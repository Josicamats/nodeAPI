'use stricts'

var app = require('./app.js')
    server = app.listen(app.get('port'), () => {
        console.log(`Iniciando express en el puerto ${app.get('port')}`)
    })
