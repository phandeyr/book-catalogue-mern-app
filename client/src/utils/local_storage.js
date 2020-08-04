const jwt_decode = require('jwt-decode')

const setToken = (token) => {
  if (token.accessToken) {
    localStorage.setItem('accessToken', token.accessToken)
  }
  
  if (token.refreshToken) {
    localStorage.setItem('refreshToken', token.refreshToken)
  }
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
  try {
    const decoded = jwt_decode(getAccessToken())
    return decoded.role
  } catch (err) {
    clearToken()
  }
}

const clearToken = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

const canRefreshToken = () => {
  const decodedAccessToken = jwt_decode(getAccessToken())
  const decodedRefreshToken = jwt_decode(getRefreshToken())
  const iat = decodedRefreshToken.iat
  const exp = decodedAccessToken.exp

  // Refresh the token if it's going to expire within two minutes and it's not reaching the expiration limit of 1 hour
  if (exp - (Date.now()/1000) <= 120 && (Date.now()/1000) - iat <= 3480) {
    const headers = { 'Content-Type': 'application/json' }

    const data = {
      token: getRefreshToken()
    }

    fetch('/auth/token', { method: 'POST', headers: headers, body: JSON.stringify(data) })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setToken(data)
    })
    .catch(console.log)
  } else if ((Date.now()/1000) >= exp) {
    clearToken()
    return false
  }
  return true
} 

export default {
  setToken, 
  getAccessToken,
  getRefreshToken,
  isAuthenticated,
  getUserRole,
  clearToken,
  canRefreshToken
}
