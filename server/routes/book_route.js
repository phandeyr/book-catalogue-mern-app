const express = require('express')
const bookController = require('../controllers/book_controller')
const authController = require('../controllers/auth_controller')

const router = express.Router()

// Post - creates a book
router.post('/', authController.authenticateToken, bookController.createBook)

module.exports = router
