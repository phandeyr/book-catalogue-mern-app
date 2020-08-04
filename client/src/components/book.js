import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cancel: false
    }
  }

  /**
   * The props received from the EditBook Component
   * Set the state accordingly
   * @param {Object} nextProps 
   */
  componentWillReceiveProps(nextProps) {
    const title = nextProps.title
    const description = nextProps.description
    const firstName = nextProps.firstName
    const lastName = nextProps.lastName
    const action = nextProps.action
    
    if (this.state.title !== title) {
      this.setState({ title: title })
    }

    if (this.state.description !== description) {
      this.setState({ description: description })
    }

    if (this.state.firstName !== firstName) {
      this.setState({ firstName: firstName })
    }

    if (this.state.lastName !== lastName) {
      this.setState({ lastName: lastName })
    }

    if (this.state.action !== action) {
      this.setState({ action: action })
    }
  }

  /**
   * Update cancel state on click
   */
  handleClick() {
    this.setState({ cancel: true })
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
      return <Redirect to='/books' />
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
