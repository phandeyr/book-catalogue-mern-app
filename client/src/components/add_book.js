import React, { Component } from 'react'
import LocalStorage from '../utils/local_storage'
import Book from './book'
import { Redirect } from 'react-router-dom'
import { Result } from '../utils/result'
import APIHelper from '../utils/api_helper'
import Alert from 'react-bootstrap/Alert'
import { withContext, handleState } from '../context/auth_context'

class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTokenExpired: false
    }
  }

  componentDidMount() {
    const canRefreshToken = LocalStorage.canRefreshToken()
    if (typeof canRefreshToken === 'string') {
      this.setState({ 
        showExpiryAlert: true,
        expiryAlertMsg: 'You will be logged out soon due to security reasons'
      })
    } else if (!canRefreshToken) {
      handleState(this.props, false)
      this.setState({ isTokenExpired: true })
    }
  }

  handleSubmit(title, description, firstName, lastName) {
    const data = {
      title: title,
      description: description,
      author: {
        firstName: firstName,
        lastName: lastName
      }
    }
  
    fetch('/books', { method: 'POST', headers: APIHelper.getAPIHeaders(true), body: JSON.stringify(data) })
    .then((res) => {
      if (res.status !== 201) {
        throw res
      }
      return res.json()
    })
    .then(() => {
      this.handleState('success')
    })
    .catch((err) => { 
      this.handleState('error')
    })
  }

  /**
   * Updates the state depending on success or failure
   * @param {String} result Determines whether success or failure whilst updating book 
   */
  handleState = (result) => {
    if (result === Result.SUCCESS) {
      this.setState({ result: result, msg: 'Book added successfully'})
    }

    if (result === Result.ERROR) {
      this.setState({ result: result, msg: 'Unable to add book.  Please try again later.'})
    }
  }

  render() {
    if (this.state.isTokenExpired) {
      return <Redirect to='/' />
    }

    if (this.state.msg) {
      return <Redirect to={{ pathname: '/books', state: { result: this.state.result, msg: this.state.msg }} } />
    }

    return(
      <div className='books'>
        { this.state.showExpiryAlert ? <Alert variant='warning'>{this.state.expiryAlertMsg}</Alert> : null }
        <Book 
          {...this.props} 
          handleSubmit={this.handleSubmit} 
          handleState={this.handleState}
          formTitle='Add Book'/>
      </div>
    )
  }
}

export default withContext(AddBook)
