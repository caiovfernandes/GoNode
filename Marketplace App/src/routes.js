const express = require('express')
const routes = express.Router()
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const authMiddleware = require('./app/middlewares/auth')

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.get('/tokenTeste', authMiddleware, (req, res) => res.json({ ok: true }))

module.exports = routes
