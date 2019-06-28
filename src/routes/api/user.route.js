'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')

router.post('/register', validator(create), userController.register) // validate and register
router.post('/login', userController.login) // login

router.get('/confirm', userController.confirm)

module.exports = router
