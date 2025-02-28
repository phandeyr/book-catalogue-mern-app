import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import LocalStorage from '../utils/local_storage'
import Alert from 'react-bootstrap/Alert'
import APIHelper from '../utils/api_helper'
import { withContext, handleState } from '../context/auth_context'
import { Path } from '../utils/paths'

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

    const data = {
      email: this.state.email,
      password: this.state.password
    }

    fetch('/auth/login', { method: 'POST', headers: APIHelper.getAPIHeaders(false), body: JSON.stringify(data) })
    .then((res) => {
      if (res.status !== 200) {
        throw res
      }
      return res.json()
    })
    .then((data) => {
      LocalStorage.setToken(data)
      handleState(this.props, true)
      this.setState({ logged_in: true })
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
      return <Redirect to={Path.BOOKLIST} />
    }

    return (
      <div className='text-center'>
        { this.state.errMsg ? <Alert variant='danger' onClose={() => this.setState({ errMsg : '' })} dismissible>{this.state.errMsg}</Alert> : null }
        <Form className='login' onSubmit={e => this.handleSubmit(e)}>
          <h4>Member Login</h4>
          <Form.Group>
            <Form.Control 
              required
              name='email'
              type='email' 
              placeholder='Email'
              onChange={e => this.setState({ email: e.target.value })}/>
          </Form.Group>
          <Form.Group>
            <Form.Control 
              required
              name='password'
              type='password' 
              placeholder='Password'
              onChange={e => this.setState({ password: e.target.value })}/>
          </Form.Group>
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    )
  }
}

export default withContext(LoginForm)
