require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  mongo: {
    uri: process.env.MONGOURI
  }
}
