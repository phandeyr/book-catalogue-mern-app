const setToken = (token) => {
  localStorage.setItem('accessToken', token.accessToken)
  localStorage.setItem('refreshToken', token.refreshToken)
}

const getAccessToken = () => {
  localStorage.getItem('accessToken')
}

const getRefreshToken = () => {
  localStorage.getItem('refreshToken')
}

export default {
  setToken, 
  getAccessToken,
  getRefreshToken
}
