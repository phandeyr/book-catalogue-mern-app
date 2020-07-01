const express = require('express')
const authController = require('../controllers/auth_controller')

const router = express.Router()

// Post - refreshes token
router.post('/token', authController.refreshToken)

// Post - login
router.post('/login', authController.authenticateUser)

// Delete - logout
router.delete('/logout', authController.deleteRefreshToken)

module.exports = router
