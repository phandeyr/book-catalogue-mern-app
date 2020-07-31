import React, { Component, Fragment } from 'react'
import LocalStorage from '../utils/local_storage'
import Book from './book'
import { Redirect } from 'react-router-dom'
import { Result } from '../utils/result'
import APIHelper from '../utils/api_helper'

class AddBook extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!LocalStorage.canRefreshToken()) {
      this.setState({ isTokenExpired: true })
    }
  }

  handleSubmit(title, description, author) {
    const name = author.split(' ')
    const data = {
      title: title,
      description: description,
      author: {
        firstName: name[0],
        lastName: name[1]
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
    if (this.state) {
      return <Redirect to={{ pathname: '/books', state: { result: this.state.result, msg: this.state.msg }} } />
    }

    return(
      <Fragment>
        <h3>Add Book</h3>
        <Book {...this.props} handleSubmit={this.handleSubmit} handleState={this.handleState}/>
      </Fragment>
    )
  }

}

export default AddBook
