const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user_model')
const RefreshToken = require('../models/refresh_token_model')

/**
 * Authenticates a user login credentials by using bcrypt compare method.
 * Authorises a user using JWT
 */
exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body
  let user
  let passwordMatch

  try {
    user = await User.find({ email })
  } catch (err) {
    res.status(500).send(err)
  }

  if (user.length === 0) {
    return res.status(404).json({ message: 'Invalid username and/or password' })
  }

  try {
    passwordMatch = await bcrypt.compare(password, user[0].password)
  } catch (err) {
    res.status(500).send(err)
  }

  if (!passwordMatch) {
    return res.status(403).json({ message: 'Invalid username and/or password' })
  }

  // JWT Authorisation
  try {
    const response = await this.jwtAuthorisation(email, user[0].role)
    return res.json(response)
  } catch (err) {
    return res.json(err)
  }
}

/**
 * Generates and returns access and refresh token
 */
exports.jwtAuthorisation = async (email, role) => {
  const user = { email, role }

  const accessToken = this.generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

  // Save refresh token to db
  const token = new RefreshToken({ refreshToken })
  try {
    await token.save()
    return ({ accessToken, refreshToken })
  } catch (err) {
    return ({ message: 'An unexpected error occurred' })
  }
}

/**
 * Generates access token with expiry
 */
exports.generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })

/**
 * Authenticates JWT
 */
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).send()
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = user
    return next()
  } catch (err) {
    return res.status(403).send()
  }
}

/**
 * Refreshes JWT token
 */
exports.refreshToken = async (req, res) => {
  const { token } = req.body
  if (token == null) {
    return res.status(401).send()
  }

  try {
    const result = await RefreshToken.findOne({ refreshToken: token })
    if (result == null) {
      return res.status(403).send()
    }
  } catch (err) {
    res.status(403).send()
  }

  // Verify token
  try {
    const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = this.generateAccessToken({ email: data.email, role: data.role })
    return res.json({ accessToken })
  } catch (err) {
    return res.status(403).send()
  }
}

/**
 * Deletes the refresh token
 */
exports.deleteRefreshToken = async (req, res) => {
  const { token } = req.body
  try {
    await RefreshToken.deleteOne({ refreshToken: token })
    res.status(204).send()
  } catch (err) {
    res.status(500).send()
  }
}

/**
 * Authorises user role
 */
exports.authoriseUserRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(401).json({ message: 'Access denied' })
  }
  return next()
}
