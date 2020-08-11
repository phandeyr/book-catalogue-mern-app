import APIHelper from '../utils/api_helper'

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
  const data = {
    token: getRefreshToken()
  }
  return new Promise((resolve, reject) => {
    fetch('/auth/logout', { method: 'DELETE', headers: APIHelper.getAPIHeaders(false), body: JSON.stringify(data) })
    .then((res) => {
      if (res.status !== 204) {
        throw res
      }
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      resolve('Success')
    })
    .catch((err) => {
      reject(`An unexpected error occurred ${err}`)
    })
  })
}

const canRefreshToken = () => {
  const decodedAccessToken = jwt_decode(getAccessToken())
  const decodedRefreshToken = jwt_decode(getRefreshToken())
  const iat = decodedRefreshToken.iat
  const exp = decodedAccessToken.exp
  
  return new Promise((resolve, reject) => {
    // Refresh the token if it's going to expire is less than or equal to two minutes and it's not reaching the expiration limit of 1 hour
    if (exp - (Date.now()/1000) <= 120 && (Date.now()/1000) - iat <= 3480) {
      const data = {
        token: getRefreshToken()
      }
  
      fetch('/auth/token', { method: 'POST', headers: APIHelper.getAPIHeaders(false), body: JSON.stringify(data) })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setToken(data)
        resolve(true)
      })
      .catch((err) => { 
        reject(`An unexpected error occurred ${err}`) 
      })
    } else if (exp - (Date.now()/1000) <= 120 && exp - (Date.now()/1000) > 0 && (Date.now()/1000) - iat > 3480) {
      resolve ('You will be logged out soon due to security reasons')
    } else if ((Date.now()/1000) >= exp) {
      resolve(false)
    } else {
      resolve(true) 
    }
  })
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
