import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LocalStorage from '../utils/local_storage'
import { Role } from '../utils/roles'
import { withRouter } from 'react-router'
import AuthContext from '../context/auth_context'
import { Path } from '../utils/paths'

/**
 * Awaits clearing the refresh token and sets the URL to the login page
 */
const logout = async () => {
  const result = await LocalStorage.clearToken()
  if (result === 'Success') {
    window.location.href = '/'
  }
}

/**
 * Returns navbar depending on whether user is authenticated and their role
 */
const Navigation = (props) => {
  return (
    <Fragment>
      <Navbar fixed='top' bg='dark' variant='dark'>
        <Navbar.Brand>Book Catalogue</Navbar.Brand>
        <Nav activeKey={props.location.pathname} className='ml-auto'>
        <AuthContext.Consumer>
          {(auth) => {
            if (!auth.isAuthenticated) {
              return <Nav.Link href='/'>Login</Nav.Link>
            } else {
              if (LocalStorage.getUserRole() === Role.ADMIN_ROLE) {
                return (
                  <Fragment>
                    <Nav.Link href={Path.BOOKLIST}>Home</Nav.Link>
                    <Nav.Link href={Path.ADD_BOOK}>Add Book</Nav.Link>
                    <Nav.Link href='#' onClick={logout}>Logout</Nav.Link>
                  </Fragment>
                )
              } else {
                return (
                  <Fragment>
                    <Nav.Link href={Path.BOOKLIST}>Home</Nav.Link>
                    <Nav.Link href='#' onClick={logout}>Logout</Nav.Link>
                  </Fragment>
                ) 
              }
            }
          }}
        </AuthContext.Consumer>
        </Nav>
      </Navbar>
    </Fragment>
  )
}

export default withRouter(Navigation)
