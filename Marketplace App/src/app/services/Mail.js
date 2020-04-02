const nodemail = require('nodemailer')
const mailConfig = require('../../config/mail')

const transport = nodemail.createTransport(mailConfig)

module.exports = transport
