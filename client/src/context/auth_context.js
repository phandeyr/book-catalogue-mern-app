import React from 'react'

const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthentication: () => {}
})

export default AuthContext