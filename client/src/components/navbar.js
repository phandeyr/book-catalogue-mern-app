import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LocalStorage from '../utils/local_storage'
import { Role } from '../utils/roles'

/**
 * Returns navbar depending on whether user is authenticated and their role
 */
const Navigation = () => {
  
  return (
    <Navbar fixed='top' bg='dark' variant='dark'>
        <Navbar.Brand>Book Catalogue</Navbar.Brand>
        <Nav className='ml-auto'>
        {(!LocalStorage.isAuthenticated()) ? <Nav.Link>Login</Nav.Link> :
          LocalStorage.getUserRole() === Role.ADMIN_ROLE ?
          <Fragment>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Add Book</Nav.Link>
            <Nav.Link>Add Author</Nav.Link>
            <Nav.Link href='/' onClick={() => LocalStorage.clearToken()}>Logout</Nav.Link>
          </Fragment> :
          <Fragment>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link href='/' onClick={() => LocalStorage.clearToken()}>Logout</Nav.Link>
          </Fragment>
        }
        </Nav>
      </Navbar>
  )
}

export default Navigation
