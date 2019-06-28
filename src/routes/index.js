'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./api/user.route')

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/auth', authRouter) // mount auth paths

module.exports = router
