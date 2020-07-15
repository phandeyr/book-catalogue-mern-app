import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigation = () => {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand>Book Catalogue</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link>Login</Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default Navigation
