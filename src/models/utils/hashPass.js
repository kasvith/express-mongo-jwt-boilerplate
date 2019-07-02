'use strict'

const bcrypt = require('bcrypt-nodejs')

const hashPass = (schema, action) => {
  schema.pre(action, async function save (next) {
    try {
      if (!this.isModified('password')) {
        return next()
      }

      this.password = bcrypt.hashSync(this.password)

      return next()
    } catch (error) {
      return next(error)
    }
  })
}

module.exports = hashPass
