const Book = require('../models/book_model')
const Author = require('../models/author_model')

/**
 * Creates and saves a book to the db.
 * Attempts to find the author by name, else creates it.
 */
exports.createBook = async (req, res) => {
  const { body } = req
  const { firstName, lastName } = req.body.author
  try {
    let author = await Author.findOne({ firstName, lastName })
    if (author == null) {
      author = await new Author({ firstName, lastName }).save()
    }

    const result = await new Book({
      title: body.title,
      description: body.description,
      // eslint-disable-next-line no-underscore-dangle
      author: author._id
    }).save()

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
