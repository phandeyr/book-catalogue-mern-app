import React, { Component, Fragment } from 'react'
import LocalStorage from '../utils/local_storage'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isTokenExpired: false,
      cancel: false,
      id: props.location.state.id,
      isUpdated: false,
      errMsg: ''
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
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${LocalStorage.getAccessToken()}`
    }
    
    fetch(`/books/${this.state.id}`, { method: 'GET', headers: headers })
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
        isLoading: false
      })
    })
    .catch(console.log)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.updateBook()
  }

  updateBook() {
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${LocalStorage.getAccessToken()}`
    }

    const data = {
      title: this.state.title,
      description: this.state.description
    }

    fetch(`/books/${this.state.id}`, { method: 'POST', headers: headers, body: JSON.stringify(data) })
    .then((res) => {
      if (res.status !== 200) {
        throw res
      }
      return res.json()
    })
    .then(() => {
      this.setState({ isUpdated: true })
    })
    .catch((err) => { 
      this.setState({ errMsg: err.statusText }) 
    })
  }

  handleClick() {
    this.setState({ cancel: true })
  }

  render() {
    if (this.state.isTokenExpired) {
      return <Redirect to='/'/>
    }

    if (this.state.isLoading) {
      return (
        <div className='text-center'>
          <Spinner animation='border' role='status'/>
          <p>Loading...</p>           
        </div>
      ) 
    }

    if (this.state.cancel) {
      return <Redirect to='/books' />
    }

    if (this.state.isUpdated) {
      return <Redirect to='/books' />
    }

    return (
      <Fragment>
        <h3>Edit Book</h3>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Group controlId='formGroupTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control 
              name='title'
              type='input'
              onChange={e => this.setState({ title: e.target.value })}
              value={this.state.title} />
          </Form.Group>
          <Form.Group controlId='formGroupDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control 
              name='description'
              type='input'
              onChange={e => this.setState({ description: e.target.value })}
              value={this.state.description} />
          </Form.Group>
          <Button onClick={this.handleClick.bind(this)}>Cancel</Button>
          <span>&nbsp;</span>
          <Button type='submit'>Save</Button>
        </Form>
      </Fragment>
    )
  }
}

export default Book
