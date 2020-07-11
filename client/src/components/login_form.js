import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LocalStorage from '../utils/local_storage'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: '',
      password: '',
      errMsg: '',
      logged_in: false
    }
  }

  /**
   * Handles submission of login form.
   * Invokes login API and sets token in local storage if successful login.
   * Displays error message if login unsuccessful.
   * @param {evt} e Submit event
   */
  handleSubmit(e) {
    e.preventDefault()

    const headers = { 'Content-Type': 'application/json' }

    const data = {
      email: this.state.email,
      password: this.state.password
    }

    fetch('/auth/login', { method: 'POST', headers: headers, body: JSON.stringify(data) })
    .then((res) => {
      if (res.status !== 200) {
        throw res
      }
      return res.json()
    })
    .then((data) => {
      this.setState({ logged_in: true })
      LocalStorage.setToken(data)
    })
    .catch((err) => {
      err.json()
      .then(errMsg => {
        this.setState({ errMsg: errMsg.message })
      })
    })
  }

  render() {
    if (this.state.logged_in) {
      return <Redirect to='/books' />
    }

    return (
      <Fragment>
        { this.state.errMsg ? <p>{this.state.errMsg}</p> : null }
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
      </Fragment>
    )
  }
}

export default LoginForm