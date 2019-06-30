'use strict'

const Admin = require('../models/admin.model')
const config = require('../config')

async function seed () {
  try {
    const count = await Admin.countDocuments({})

    if (count === 0) {
      const user = {
        name: config.admin.name,
        email: config.admin.email,
        password: config.admin.password
      }

      const admin = new Admin(user)
      await admin.save()
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = seed
