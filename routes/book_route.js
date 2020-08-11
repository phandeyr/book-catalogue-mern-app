const express = require('express')
const bookController = require('../controllers/book_controller')
const authController = require('../controllers/auth_controller')
const roles = require('../roles')

const router = express.Router()

// Post - creates a book
router.post('/', authController.authenticateToken, authController.authoriseUserRole(roles.ADMIN_ROLE), bookController.createBook)

// Get - gets all books
router.get('/', authController.authenticateToken, bookController.getBooks)

// Get - gets a specific book detail
router.get('/:id', authController.authenticateToken, bookController.getBookDetail)

// Post - updates a specific book
router.post('/:id', authController.authenticateToken, authController.authoriseUserRole(roles.ADMIN_ROLE), bookController.updateBook)

// Delete - deletes a specific book
router.delete('/:id', authController.authenticateToken, authController.authoriseUserRole(roles.ADMIN_ROLE), bookController.deleteBook)

module.exports = router
