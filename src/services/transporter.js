'use strict'

const nodemailer = require('nodemailer')
const { host, port, username, password } = require('../config').transporter

const transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: username,
    pass: password
  }
})

module.exports = transport
