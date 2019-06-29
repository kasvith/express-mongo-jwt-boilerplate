'use strict'

const Admin = require('../models/admin.model')
const jwt = require('jsonwebtoken')
const config = require('../config')
const httpStatus = require('http-status')

exports.register = async (req, res, next) => {
  try {
    const admin = new Admin(req.body)
    const savedAdmin = await admin.save()
    res.status(httpStatus.CREATED)
    res.send(savedAdmin.transform())
  } catch (error) {
    return next(Admin.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const admin = await Admin.findAndGenerateToken(req.body)
    const payload = {sub: admin.id}
    const token = jwt.sign(payload, config.secret)
    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}
