const bcrypt = require('bcrypt-nodejs')

const hashPass = (schema) => {
  schema.pre('save', async function save (next) {
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
