const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String
  }
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
