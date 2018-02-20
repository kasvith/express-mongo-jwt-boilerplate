'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validator(create), authController.register) // validate and register
router.post('/login', authController.login) // login

// Authentication example
router.get('/secret1', auth(), (req, res) => {
  // example route for auth
  res.json({ message: 'Anyone can access(only authorized)' })
})
router.get('/secret2', auth(['admin']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only admin can access' })
})
router.get('/secret3', auth(['user']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only user can access' })
})

module.exports = router
