import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      password: ''
    }
  }

  /**
   * Handles submission of login form.
   * Invokes login API.
   * @param {evt} e Submit event
   */
  handleSubmit(e) {
    e.preventDefault()

    const headers = { 'Content-Type': 'application/json' }

    const data = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(data)

    fetch('/auth/login', { method: 'POST', headers: headers, body: JSON.stringify(data) })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log(json)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            required
            name='email'
            type='email' 
            placeholder='Email'
            onChange={e => this.setState({ email: e.target.value })}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            required
            name='password'
            type='password' 
            placeholder='Password'
            onChange={e => this.setState({ password: e.target.value })}/>
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
      </Form>
    )
  }
}

export default LoginForm