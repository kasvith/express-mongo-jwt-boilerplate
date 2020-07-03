'use strict'

const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin.controller')
const auth = require('../../middlewares/authorization')

router.post('/login', adminController.login)
router.post('/register', auth(['admin']), adminController.register)

module.exports = router
