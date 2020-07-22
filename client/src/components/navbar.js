import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LocalStorage from '../utils/local_storage'
import { Role } from '../utils/roles'
import { withRouter } from 'react-router'

/**
 * Returns navbar depending on whether user is authenticated and their role
 */
const Navigation = (props) => {
  return (
    <Navbar fixed='top' bg='dark' variant='dark'>
        <Navbar.Brand>Book Catalogue</Navbar.Brand>
        <Nav activeKey={props.location.pathname} className='ml-auto'>
        {(!props.auth) ? <Nav.Link href='/'>Login</Nav.Link> :
          LocalStorage.getUserRole() === Role.ADMIN_ROLE ?
          <Fragment>
            <Nav.Link href='/books'>Home</Nav.Link>
            <Nav.Link>Add Book</Nav.Link>
            <Nav.Link>Add Author</Nav.Link>
            <Nav.Link href='/' onClick={() => LocalStorage.clearToken()}>Logout</Nav.Link>
          </Fragment> :
          <Fragment>
            <Nav.Link href='/books'>Home</Nav.Link>
            <Nav.Link href='/' onClick={() => LocalStorage.clearToken()}>Logout</Nav.Link>
          </Fragment>
        }
        </Nav>
      </Navbar>
  )
}

export default withRouter(Navigation)
