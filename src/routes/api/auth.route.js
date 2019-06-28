'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/authorization')

// Authentication example routes
router.get('/secret1', auth(), (req, res) => {
  res.json({ message: 'Anyone can access(only authorized)' })
})
router.get('/secret2', auth(['admin']), (req, res) => {
  res.json({ message: 'Only admin can access' })
})
router.get('/secret3', auth(['user']), (req, res) => {
  res.json({ message: 'Only user can access' })
})

module.exports = router
