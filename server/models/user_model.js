const mongoose = require('mongoose')

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
        minlength: 8
    },
    email: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)