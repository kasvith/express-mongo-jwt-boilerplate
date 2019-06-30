'use strict'

const httpStatus = require('http-status')
const APIError = require('../../utils/APIError')
const User = require('../user.model')
const Admin = require('../admin.model')

async function findAndGenerateToken (payload, from) {
  const { email, password } = payload
  if (!email) throw new APIError('Email must be provided for login')
  let user

  if (from === 'admin') {
    user = await Admin.findOne({ email }).exec()
  }
  if (from === 'user') {
    user = await User.findOne({ email }).exec()
  }

  if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

  const passwordOK = await user.passwordMatches(password)

  if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)
  if (from === 'admin' && !user.active) {
    throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)
  }

  return user
}

module.exports = findAndGenerateToken
