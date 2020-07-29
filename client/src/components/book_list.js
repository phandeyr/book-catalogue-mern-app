import React, { Component, Fragment } from 'react'
import LocalStorage from '../utils/local_storage'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import Spinner from 'react-bootstrap/Spinner'
import { Role } from '../utils/roles'
import { MdEdit, MdDelete } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isTokenExpired: false,
      edit: false,
      delete: false,
      books: []
    }
  }

  componentDidMount() {
    if (!LocalStorage.canRefreshToken()) {
      this.setState({ isTokenExpired: true })
    }
    this.getBooks()
  }

  /**
   * Invokes API to retrieve all books - setting headers
   */
  getBooks() {
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${LocalStorage.getAccessToken()}`
    }
    
    fetch('/books', { method: 'GET', headers: headers })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        books: data,
        isLoading: false
      })
    })
    .catch(console.log)
  }

  /**
   * Columns to display in bootstrap table dependening on user role
   */
  getColumns() {
    if (LocalStorage.getUserRole() === Role.ADMIN_ROLE) {
      return [{
        dataField: 'title',
        text: 'Title'
      }, {
        dataField: 'description',
        text: 'Description'
      }, {
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        formatter: this.actionsFormatter
      }]
    }

    return [{
      dataField: 'title',
      text: 'Title'
    }, {
      dataField: 'description',
      text: 'Description'
    }]
  }

  handleClick(action, id) {
    if (action === 'edit') {
      this.setState({ edit: true, id: id })
    }

    if (action === 'delete') {
      this.setState({ delete: true })
    }
  }
  
  actionsFormatter = (cell, row) => {
    const id = row._id
    return (
      <Fragment>
        <Button onClick={() => this.handleClick('edit', id)} size='sm' variant='warning'>
          <MdEdit/>
        </Button>
        <span>&nbsp;</span>
        <Button onClick={() => this.handleClick('delete', id)} size='sm' variant='danger'>
          <MdDelete/>
        </Button>
      </Fragment> 
    )
  }

  /**
   * Config options for bootstrap table
   */
  getOptions() {
    return { showTotal: true }
  }

  render() {
    if (this.state.isTokenExpired) {
      return <Redirect to='/'/>
    }

    if (this.state.edit) {
      return <Redirect to={{pathname: '/books/edit', state: { id: this.state.id }}} />
    }

    if (this.state.delete) {
      // TO-DO: Delete confirmation modal
    }

    if (this.state.isLoading) {
      return (
        <div className='text-center'>
          <Spinner animation='border' role='status'/>
          <p>Loading...</p>           
        </div>
      ) 
    }

    return (
      <Fragment>
        <h3>Books</h3>
        <BootstrapTable
          keyField='_id' 
          data={ this.state.books } 
          columns={ this.getColumns() }
          striped
          hover
          noDataIndication='There are currently no books'
          pagination={ paginationFactory(this.getOptions()) } />
      </Fragment>
    )
  }
}

export default BookList
