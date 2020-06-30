const User = require('../models/user_model')
const bcrypt = require('bcryptjs')

// Saves a user to the db 
exports.createUser = async (req,res) => {
  const body = req.body
  let hashedPassword
  try {
    // Hash user password
    const salt = await bcrypt.genSalt()
    hashedPassword = await bcrypt.hash(req.body.password, salt)

  } catch {
    res.status(500).send()
  }
  
  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    password: hashedPassword,
    email: body.email
  });

  user.save()
    .then(() => {
      res.status(201).send(JSON.stringify({
        firstName: body.firstName, 
        lastName: body.lastName,
        email: body.email
      }))
    })
    .catch((err) => {
      if (err.keyValue && 'email' in err.keyValue) {
        res.status(500).send(JSON.stringify({
          message: 'Emaill already exists: ' + err.keyValue.email
        }))
      }
    })
}
