'use strict'

const Joi = require('joi')

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required()
    }
  },
  update: {
    body: {
      _id: Joi.any().forbidden(),
      email: Joi.any().forbidden(),
      password: Joi.string().min(6).max(128),
      name: Joi.string().max(128),
      activationKey: Joi.any().forbidden(),
      active: Joi.any().forbidden(),
      resetPasswordKey: Joi.any().forbidden()
    }
  }
}
