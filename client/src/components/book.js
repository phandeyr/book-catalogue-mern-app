import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { Path } from '../utils/paths'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cancel: false
    }
  }

  /**
   * Update cancel state on click
   */
  handleClick() {
    this.setState({ cancel: true })
  }

  /**
   * Sets the state from props, unless it's been updated
   * @param {Object} props 
   * @param {Object} state 
   */
  static getDerivedStateFromProps(props, state) {
    let update = {}

    update.title = props.title
    update.description = props.description
    update.firstName = props.firstName
    update.lastName = props.lastName
    update.action = props.action

    if (state.title !== undefined) {
      update.title = state.title
    } 

    if (state.description !== undefined) {
      update.description = state.description
    }

    if (state.firstName !== undefined) {
      update.firstName = state.firstName
    }

    if (state.lastName !== undefined) {
      update.lastName = state.lastName
    }

    return update
  }

  /**
   * Handles form submission accordingly dependening on action
   * @param {Event} e 
   */
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.action === 'edit') {
      this.props.handleSubmit(this.state.title, this.state.description, this.state.firstName, this.state.lastName, this.props.location.state.id)
    } else {
      this.props.handleSubmit(this.state.title, this.state.description, this.state.firstName, this.state.lastName)
    }
  } 

  render() {
    if (this.state.cancel) {
      return <Redirect to={Path.BOOKLIST} />
    }

    return (
      <Fragment>
        <Form className='book' onSubmit={this.handleSubmit}>
          <h3>{this.props.formTitle}</h3>
          <hr/>
          <Form.Group controlId='formGroupTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control 
              required
              name='title'
              type='input'
              onChange={e => this.setState({ title: e.target.value })}
              defaultValue={this.props.title} />
          </Form.Group>
          <Form.Group controlId='formGroupDescription'>
            <Form.Label>Description</Form.Label>
            <Form.Control 
              name='description'
              type='input'
              onChange={e => this.setState({ description: e.target.value })}
              defaultValue={this.props.description} />
          </Form.Group>
          <Form.Group controlId='formGroupAuthor'>
            <h5>Author</h5>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required  
                  name='firstName'
                  type='input' 
                  onChange={e => this.setState({ firstName: e.target.value })}
                  defaultValue={this.props.firstName}/>
              </Form.Group>
              <Form.Group as={Col} controlId='formGridLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  name='lastName'
                  type='input'
                  onChange={e => this.setState({ lastName: e.target.value })}
                  defaultValue={this.props.lastName}/>
              </Form.Group>
            </Form.Row>
          </Form.Group>
          <div className='book_btn'>
            <Button onClick={this.handleClick.bind(this)}>Cancel</Button>
            <span>&nbsp;</span>
            <Button type='submit'>Save</Button>
          </div>
        </Form>
      </Fragment>
    )
  }
}

export default Book
