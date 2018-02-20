'use strict'

const config = require('../config')
const User = require('../models/user.model')
const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  console.log(jwtPayload)
  User.findById(jwtPayload.sub, (err, user) => {
    if (err) {
      return done(err, null)
    }

    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})

exports.jwtOptions = jwtOptions
exports.jwt = jwtStrategy
