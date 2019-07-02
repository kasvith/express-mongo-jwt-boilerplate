'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema
const hashPass = require('./utils/hashPass')
const checkDuplicateEmailError = require('./utils/checkDuplicateEmailError')

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  name: {
    type: String,
    maxlength: 50
  },
  admin: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

hashPass(adminSchema)

adminSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'email', 'createdAt']
    fields.forEach((field) => { transformed[field] = this[field] })
    return transformed
  },

  passwordMatches (password) {
    return bcrypt.compareSync(password, this.password)
  }
})

adminSchema.statics = { checkDuplicateEmailError }

module.exports = mongoose.model('Admin', adminSchema)
