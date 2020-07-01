const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user_model')
const RefreshToken = require('../models/refresh_token_model')

/**
 * Authenticates a user login credentials by using bcrypt compare method.
 * Authorises a user using JWT
 */
exports.authenticateUser = async (req, res) => {
  let user
  let passwordMatch
  try {
    user = await User.find({ email: req.body.email })
  } catch (err) {
    res.status(500).send(err)
  }

  if (user.length === 0) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    passwordMatch = await bcrypt.compare(req.body.password, user[0].password)
  } catch (err) {
    res.status(500).send(err)
  }

  if (!passwordMatch) {
    return res.status(403).json({ message: 'Not Allowed' })
  }

  // JWT Authorisation
  const response = await this.jwtAuthorisation(req.body.email, user[0].role)
  return res.json(response)
}

/**
 * Generates and returns access and refresh token
 */
exports.jwtAuthorisation = async (email, role) => {
  const user = { email, role }

  const accessToken = this.generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  // Save refresh token to db
  try {
    const token = new RefreshToken({ refreshToken })
    await token.save()
  } catch (err) {
    console.log(err)
  }

  return ({ accessToken, refreshToken })
}

/**
 * Generates access token with expiry
 */
exports.generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })

/**
 * Authenticates JWT
 */
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).send()
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send()
    }
    req.user = user
    return next()
  })

  return null
}

/**
 * Refreshes JWT token
 */
exports.refreshToken = (req, res) => {
  const { token } = req.body
  if (token == null) {
    res.status(401).send()
  }
  RefreshToken.find({ refreshToken: token }, (err) => {
    if (err) {
      return res.status(403).send()
    }

    // Verify token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, data) => {
      if (error) {
        return res.status(403).send()
      }

      const accessToken = this.generateAccessToken({ email: data.email, role: data.role })
      return res.json(accessToken)
    })

    return null
  })
}

/**
 * Deletes the refresh token
 */
exports.deleteRefreshToken = async (req, res) => {
  const { token } = req

  RefreshToken.findOneAndDelete({ refreshToken: token }, (err) => {
    if (err) {
      res.status(500).send('Unable to delete refresh token')
    }
    res.status(204).send()
  })
}
