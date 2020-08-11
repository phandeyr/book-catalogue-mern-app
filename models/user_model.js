const mongoose = require('mongoose')
require('mongoose-type-email')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    maxlength: 255
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true
  },
  role: {
    type: String,
    enum: ['member', 'admin']
  }
})

module.exports = mongoose.model('User', userSchema)
