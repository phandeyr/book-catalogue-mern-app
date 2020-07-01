const mongoose = require('mongoose')
const Author = require('./author_model')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: Author
  }
})

module.exports = mongoose.model('Book', bookSchema)
