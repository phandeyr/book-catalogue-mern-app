import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LocalStorage from '../utils/local_storage'
import { Role } from '../utils/roles'
import { withRouter } from 'react-router'
import AuthContext from '../context/auth_context'

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
                    <Nav.Link href='/books'>Home</Nav.Link>
                    <Nav.Link href='/books/add'>Add Book</Nav.Link>
                    <Nav.Link href='/' onClick={() => LocalStorage.clearToken()}>Logout</Nav.Link>
                  </Fragment>
                )
              } else {
                return (
                  <Fragment>
                    <Nav.Link href='/books'>Home</Nav.Link>
                    <Nav.Link href='/' onClick={() => LocalStorage.clearToken()}>Logout</Nav.Link>
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
