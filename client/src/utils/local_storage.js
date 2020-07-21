const jwt_decode = require('jwt-decode')

const setToken = (token) => {
  localStorage.setItem('accessToken', token.accessToken)
  localStorage.setItem('refreshToken', token.refreshToken)
}

const getAccessToken = () => {
  return localStorage.getItem('accessToken')
}

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

const isAuthenticated = () => {
  return getAccessToken() !== null
}

const getUserRole = () => {
  const decoded = jwt_decode(getAccessToken())
  return decoded.role
}

const clearToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export default {
  setToken, 
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  getUserRole,
  clearToken
}
