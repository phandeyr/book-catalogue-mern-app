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
    res.status(500).json({ message: 'Unable to create book' })
  }
}

/**
 * Gets all books
 */
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find()
    if (books) {
      res.json(books)
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve all books' })
  }
}

/**
 * Gets a specific book's detail
 */
exports.getBookDetail = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (book) {
      res.json(book)
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to retrieve book' })
  }
}

/**
 * Updates a specific book
 */
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (book) {
      res.json(book)
    }
  } catch (err) {
    res.status(500).json({ message: 'Unable to update book' })
  }
}

/**
 * Deletes a specific book
 */
exports.deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ message: 'Unable to delete book' })
  }
}
