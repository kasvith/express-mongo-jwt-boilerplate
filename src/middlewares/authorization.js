'use strict'

const passport = require('passport')
const APIError = require('../utils/APIError')
const httpStatus = require('http-status')
const bluebird = require('bluebird')

// handleJWT with roles
const handleJWT = (req, res, next, role) => async (err, user, info) => {
  const error = err || info
  const logIn = bluebird.promisify(req.logIn)
  const apiError = new APIError(
    error ? error.message : 'Unauthorized', httpStatus.UNAUTHORIZED
  )

  // log user in
  try {
    if (error || !user) throw error
    await logIn(user, { session: false })
  } catch (e) {
    return next(apiError)
  }

  // see if user is authorized to do the action
  if (role.includes('admin') && !user.admin) {
    return next(new APIError('Forbidden', httpStatus.FORBIDDEN))
  }

  req.user = user

  return next()
}

// exports the middleware
const authorize = (role) => (req, res, next) =>
  passport.authenticate(
    'jwt',
    { session: false },
    handleJWT(req, res, next, role)
  )(req, res, next)

module.exports = authorize
