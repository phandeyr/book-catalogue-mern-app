const express = require('express')
const bookController = require('../controllers/book_controller')
const authController = require('../controllers/auth_controller')
const roles = require('../roles')

const router = express.Router()

// Post - creates a book
router.post('/', authController.authenticateToken, authController.authoriseUserRole(roles.ADMIN_ROLE), bookController.createBook)

module.exports = router
