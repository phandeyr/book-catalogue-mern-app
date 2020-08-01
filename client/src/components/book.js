import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    const title = nextProps.title;
    const description = nextProps.description
    const author = nextProps.author
    const action = nextProps.action
    
    if (this.state.title !== title) {
      this.setState({ title: title })
    }

    if (this.state.description !== description) {
      this.setState({ description: description })
    }

    if (this.state.author !== author) {
      this.setState({ author: author })
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
      this.props.handleSubmit(this.state.title, this.state.description, this.state.author, this.props.location.state.id)
    } else {
      this.props.handleSubmit(this.state.title, this.state.description, this.state.author)
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
            <Form.Label>Author</Form.Label>
            <Form.Control 
              type='input'
              name='author'
              onChange={e => this.setState({ author: e.target.value })}
              defaultValue={this.props.author} />
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
