const bcrypt = require('bcryptjs')
const User = require('../models/user_model')

/**
 * Creates and saves a user to the db
 */
exports.createUser = async (req, res) => {
  const { body } = req
  let hashedPassword
  try {
    // Hash user password
    const salt = await bcrypt.genSalt()
    hashedPassword = await bcrypt.hash(body.password, salt)
  } catch (err) {
    res.status(500).send()
  }

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    password: hashedPassword,
    email: body.email,
    role: body.role
  })

  try {
    const response = await user.save()
    if (response) {
      res.status(201).json({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email
      })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
