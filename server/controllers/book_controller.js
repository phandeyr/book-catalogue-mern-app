const Book = require('../models/book_model')

exports.createBook = async (req, res) => {
  const book = new Book(req.body)
  res.json(book)
}
