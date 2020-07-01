const express = require('express')
const userController = require('../controllers/user_controller')

const router = express.Router()

// Post - creates a user
router.post('/', userController.createUser)

module.exports = router
