const Book = require('../models/book_model')
const Author = require('../controllers/author_controller')

/**
 * Creates and saves a book to the db
 */
exports.createBook = async (req, res) => {
  const { body } = req
  const { firstName, lastName } = req.body.author
  try {
    const id = await Author.createAuthor(firstName, lastName)

    const result = await new Book({
      title: body.title,
      description: body.description,
      author: id
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
    let response = []
    const books = await Book.find()
    if (books) {
      for await (const book of books) {
        let authorName = {}
        const author = await Author.findAuthor(book.author)
        
        if (author !== null) {
          authorName['firstName'] = author.firstName
          authorName['lastName'] = author.lastName
        }

        const output = { _id: book._id, title: book.title, description: book.description, author: authorName }
        response.push(output)
      }
    
      res.json(response)
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
      const author = await Author.findAuthor(book.author)

      res.status(200).json({
        title: book.title,
        description: book.description,
        author: {
          firstName: author.firstName,
          lastName: author.lastName
        }
      })
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
    const { title, description } = req.body
    const { firstName, lastName } = req.body.author
    const id = await Author.createAuthor(firstName, lastName)
    
    const data = {
      title: title,
      description: description,
      author: id
    }
   
    const book = await Book.findByIdAndUpdate(req.params.id, data, { new: true })
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
