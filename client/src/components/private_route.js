import React, { Component } from 'react'
// eslint-disable-next-line
import {BrowserRouter as Route, Redirect } from 'react-router-dom'
import LocalStorage from '../utils/local_storage'

class PrivateRoute extends Component {

  render() {
    const Component = this.props.component
    return LocalStorage.isAuthenticated() ? <Component {...this.props}/> : <Redirect to='/'/>
  }
}

export default PrivateRoute
