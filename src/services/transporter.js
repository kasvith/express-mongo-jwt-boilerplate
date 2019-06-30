const nodemailer = require('nodemailer')
const config = require('../config')

const transporter = nodemailer.createTransport({
  service: config.transporter.service,
  auth: {
    user: config.transporter.email,
    pass: config.transporter.password
  }
})

module.exports = transporter
