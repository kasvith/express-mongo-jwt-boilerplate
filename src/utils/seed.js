const Admin = require('../models/admin.model')

async function seed () {
  try {
    const count = await Admin.countDocuments({})

    if (count === 0) {
      const user = {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: 'admin123'
      }

      const admin = new Admin(user)
      await admin.save()
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = seed
