const Book = require('../models/book_model')

/**
 * Creates and saves a book to the db
 */
exports.createBook = async (req, res) => {
  const book = new Book(req.body)
  try {
    const result = await book.save()
    if (result) {
      res.status(201).json(result)
    }
  } catch (err) {
    res.status(500).send('Unable to create book')
  }
}
