import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import LocalStorage from '../utils/local_storage'
import Book from './book'
import { Result } from '../utils/result'
import APIHelper from '../utils/api_helper'

class EditBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTokenExpired: false
    }
  }

  componentDidMount() {
    if (!LocalStorage.canRefreshToken()) {
      this.setState({ isTokenExpired: true })
    }
    
    this.getBook()
  }

  /**
   * Invokes API to retrieve book details - setting headers
   */
  getBook() {
    fetch(`/books/${this.props.location.state.id}`, { method: 'GET', headers: APIHelper.getAPIHeaders(true) })
    .then((res) => {
      if (res.status !== 200) {
        throw res
      }
      return res.json()
    })
    .then((data) => {
      this.setState({
        title: data.title,
        description: data.description,
        firstName: data.author.firstName,
        lastName: data.author.lastName,
        isLoading: false,
      })
    })
    .catch(console.log)
  }

  /**
   * Invokes API to update book
   * @param {String} title Title of book
   * @param {String} description Description of book
   * @param {String} author Author of book
   * @param {String} id Id of book
   */
  handleSubmit(title, description, firstName, lastName, id) {
    const data = {
      title: title,
      description: description,
      author: {
        firstName: firstName,
        lastName: lastName
      }
    }
  
    fetch(`/books/${id}`, { method: 'POST', headers: APIHelper.getAPIHeaders(true), body: JSON.stringify(data) })
    .then((res) => {
      if (res.status !== 200) {
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
      this.setState({ result: result, msg: 'Book updated successfully'})
    }

    if (result === Result.ERROR) {
      this.setState({ result: result, msg: 'Unable to update book.  Please try again later.'})
    }
  }

  render() {
    if (this.state.isTokenExpired) {
      return <Redirect to='/'/>
    }

    if (this.state.msg) {
      return <Redirect to={{ pathname: '/books', state: { result: this.state.result, msg: this.state.msg }} } />
    }

    return(
      <Fragment>
        <Book 
          {...this.props} 
          handleSubmit={this.handleSubmit} 
          handleState={this.handleState} 
          title={this.state.title} 
          description={this.state.description} 
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          formTitle='Edit Book'
          action='edit'/>
      </Fragment>
    )
  }
}

export default EditBook
