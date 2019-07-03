'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
const { update } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validator(create), userController.register)
router.post('/login', userController.login)
router.post('/resetStart', auth(), userController.reset.sendMail)

router.get('/confirm', userController.confirm)
router.get('/resetConfirm', userController.reset.updatePass)

router.put('/update', validator(update), auth(), userController.update)

module.exports = router
