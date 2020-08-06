import React from 'react'

const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthentication: () => {}
})

export const withContext = (Component) => {
  return (props) => (
    <AuthContext.Consumer>    
      {(context) => {
        return <Component {...props} context={context} />
      }}
    </AuthContext.Consumer>
  )
}

export const handleState = (props, auth) => {
  props.context.setAuthentication(auth)
}

export default AuthContext
