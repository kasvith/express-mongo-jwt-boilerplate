'use strict'

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')
const generateToken = require('../models/utils/findAndGenerateToken')
const passport = require('../services/passport')
const bcrypt = require('bcrypt-nodejs')
const transporter = require('../services/transporter')

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const body = req.body
    body.activationKey = activationKey
    const user = new User(body)
    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.send(savedUser.transform())
  } catch (error) {
    return next(User.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await generateToken(req.body, 'user')
    const payload = {sub: user.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    if (!passport.user) return res.status(httpStatus.FORBIDDEN)
    const user = await User.findOne({ 'email': passport.user.email }).exec()
    if (!user.passwordMatches(req.body.password)) return res.status(httpStatus.FORBIDDEN)
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password)
    await User.findOneAndUpdate(
      { '_id': passport.user._id },
      { $set: req.body }
    )
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { 'activationKey': req.query.key },
      { 'active': true }
    )
    return res.json({ message: 'OK' })
  } catch (error) {
    next(error)
  }
}

exports.reset = {
  async sendMail (req, res, next) {
    try {
      const resetPasswordKey = uuidv1()
      await User.findOneAndUpdate(
        { '_id': passport.user._id },
        { 'resetPasswordKey': resetPasswordKey }
      )
      const mailOptions = {
        from: 'noreply',
        to: passport.user.email,
        subject: 'Reset password',
        html: `<div><h1>Hello user!</h1><p>Click <a href="${config.baseURI}/api/user/resetConfirm?key=${resetPasswordKey}">link</a> to reset your password.</p></div><div><h1>Hello developer!</h1><p>Feel free to change this template ;).</p></div>`
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          next(error)
        } else {
          return res.json({ message: 'OK' })
        }
      })
    } catch (error) {
      next(error)
    }
  },
  async updatePass (req, res, next) {
    try {
      if (!req.query.key) return res.status(httpStatus.BAD_REQUEST)
      const newPassword = uuidv1()
      const newPasswordHash = bcrypt.hashSync(newPassword)
      await User.findOneAndUpdate(
        { 'resetPasswordKey': req.query.key },
        { $set: { 'password': newPasswordHash, 'resetPasswordKey': '' } }
      )
      return res.json({ message: 'OK', newPassword: newPassword })
    } catch (error) {
      next(error)
    }
  }
}
