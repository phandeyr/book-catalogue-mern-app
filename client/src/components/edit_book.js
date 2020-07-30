import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import LocalStorage from '../utils/local_storage'
import Book from './book'
import { Result } from '../utils/result'

class EditBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      action: 'edit'
    }
  }

  componentDidMount() {
    if (!LocalStorage.canRefreshToken()) {
      this.setState({ isTokenExpired: true })
    }

    if (this.state.action === 'edit') {
      this.getBook()
    }
  }

  /**
   * Invokes API to retrieve book details - setting headers
   */
  getBook() {
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${LocalStorage.getAccessToken()}`
    }
    
    fetch(`/books/${this.props.location.state.id}`, { method: 'GET', headers: headers })
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
        author: data.author.firstName + ' ' + data.author.lastName,
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
  handleSubmit(title, description, author, id) {
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${LocalStorage.getAccessToken()}`
    }

    const name = author.split(' ')  
    const data = {
      title: title,
      description: description,
      author: {
        firstName: name[0],
        lastName: name[1]
      }
    }
  
    fetch(`/books/${id}`, { method: 'POST', headers: headers, body: JSON.stringify(data) })
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
        <h3>Edit Book</h3>
        <Book 
          {...this.props} 
          handleSubmit={this.handleSubmit} 
          handleState={this.handleState} 
          title={this.state.title} 
          description={this.state.description} 
          author={this.state.author}
          action='edit'/>
      </Fragment>
    )
  }
}

export default EditBook
