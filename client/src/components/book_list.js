import React, { Component, Fragment } from 'react'
import LocalStorage from '../utils/local_storage'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import Spinner from 'react-bootstrap/Spinner'

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      books: []
    }
  }

  componentDidMount() {
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
      if (res.status === 403) {

      }
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
   * Columns to display in bootstrap table
   */
  getColumns() {
    return [{
      dataField: 'title',
      text: 'Title'
    }, {
      dataField: 'description',
      text: 'Description'
    }]
  }

  /**
   * Config options for bootstrap table
   */
  getOptions() {
    return { showTotal: true }
  }

  render() {
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
