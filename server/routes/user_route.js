const express = require('express')
const router = express.Router()

const userController = require('../controllers/user_controller')

// Post - creates a user
router.post('/', userController.createUser)

module.exports = router