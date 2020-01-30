const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('connect-flash')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production' // - Development, Production or Testing.

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(session({
      name: 'root',
      store: new FileStore({
        path: path.resolve(__dirname, '..', 'tmp', 'sessions')
      }),
      secret: 'MyAppSecret',
      resave: true,
      saveUninitialized: true
    }))
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      // __dirname = diretório atual.
      watch: this.isDev, // Configuração para que só recarregue o código na página em ambiente de desenvolvimento.
      express: this.express,
      autoescape: true
    })
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}
module.exports = new App().express
