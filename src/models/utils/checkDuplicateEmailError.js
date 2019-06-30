'use strict'

const httpStatus = require('http-status')

function checkDuplicateEmailError (err) {
  if (err.code === 11000) {
    var error = new Error('Email already taken')
    error.errors = [{
      field: 'email',
      location: 'body',
      messages: ['Email already taken']
    }]
    error.status = httpStatus.CONFLICT
    return error
  }

  return err
}

module.exports = checkDuplicateEmailError
