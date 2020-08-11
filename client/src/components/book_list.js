import React, { Component, Fragment } from 'react'
import LocalStorage from '../utils/local_storage'
import paginationFactory from 'react-bootstrap-table2-paginator'
import BootstrapTable from 'react-bootstrap-table-next'
import Spinner from 'react-bootstrap/Spinner'
import { Role } from '../utils/roles'
import { MdEdit, MdDelete } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { Result } from '../utils/result'
import DeleteModal from '../components/delete_modal'
import APIHelper from '../utils/api_helper'
import { withContext, handleState } from '../context/auth_context'

class BookList extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isLoading: true,
      isTokenExpired: false,
      edit: false,
      delete: false,
      books: [],
      alertMsg: '',
      showAlert: false
    }
  }

  async componentDidMount() {
    const canRefreshToken = await LocalStorage.canRefreshToken()
    if (typeof canRefreshToken === 'string') {
      this.setState({ 
        showExpiryAlert: true,
        expiryAlertMsg: canRefreshToken
      })
      this.getBooks()
    } else if (!canRefreshToken) {
      const result = await LocalStorage.clearToken()
      if (result === 'Success') {
        handleState(this.props, false)
        this.setState({ isTokenExpired: true })
      }
    } else {
      this.getBooks()
    }
    
    if (this.props.location.state) {
      this.setState({ 
        showAlert: true,
        alertMsg: this.props.location.state.msg
      })
      this.props.history.replace('/books')
    }
  }

  componentDidUpdate() {
    if (this.state.showAlert) {
      this.setTimer()
    }
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  /**
   * Sets timeout to close alert
   */
  setTimer = () => {
    this.timer = setTimeout(() => this.closeAlert(), 3000)
  }

  /**
   * Clears the timeout if it exists
   */
  clearTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  /**
   * Invokes API to retrieve all books - setting headers
   */
  getBooks() {
    fetch('/books', { method: 'GET', headers: APIHelper.getAPIHeaders(true) })
    .then((res) => {
      if (res.status !== 200) {
        throw res
      }
      return res.json()
    })
    .then((data) => {
      this.setState({
        books: data,
        isLoading: false
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  /**
   * Returns the columns to display dependening on user role
   */
  getColumns() {
    let columns = this.getStandardColumns()
    
    if (LocalStorage.getUserRole() === Role.ADMIN_ROLE) {
      columns.push({
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        formatter: this.actionsFormatter
      })
    }

    return columns
  }

  /**
   * Returns the standard columns to display in bootstrap table
   */
  getStandardColumns() {
    return [{
      dataField: 'title',
      text: 'Title'
      }, {
      dataField: 'description',
      text: 'Description'
      }, {
      dataField: 'author',
      text: 'Author',
      formatter: this.authorNameFormatter
    }]
  }

  /**
   * 
   * @param {String} action determines action mode
   * @param {String} id Id of the book selected in the row
   */
  handleClick(action, id) {
    if (action === 'edit') {
      this.setState({ edit: true, id: id })
    }

    if (action === 'delete') {
      this.setState({ 
        delete: true, 
        modalShow: true, 
        id: id
      })
    }
  }

  /**
   * Updates state to not display the alert
   */
  closeAlert = () => {
    this.setState({ 
      showAlert: false,
      alertMsg: '' 
    })
  }

  /**
   * Invokes API to delete the book
   */
  deleteBook = () => {
    fetch(`/books/${this.state.id}`, { method: 'DELETE', headers: APIHelper.getAPIHeaders(true) })
    .then((res) => {
      if (res.status !== 204) {
        throw res
      }
      return res
    })
    .then(() => {
      this.setState(prevState => ({
        books: prevState.books.filter(book => book._id !== this.state.id),
        showAlert: true,
        modalShow: false,
        alertMsg: 'Book deleted successfully'
      }))
    })
    .catch((err) => console.log(err))
  }
  
  /**
   * Returns the author's first and last name
   * @param {*} cell 
   * @param {*} row 
   */
  authorNameFormatter = (cell, row) => {
    return `${cell.firstName} ${cell.lastName}`
  }

  /**
   * Display actions in cell and handles onClick events
   * @param {*} cell 
   * @param {*} row 
   */
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
      return <Redirect to='/' />
    }

    if (this.state.edit) {
      return <Redirect to={{pathname: '/books/edit', state: { id: this.state.id }}} />
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
      <div className='books'>
        { this.state.showAlert ?
          (this.state.propState ? 
            (this.state.propState.result === Result.SUCCESS ? 
              <Alert variant='success' onClose={this.closeAlert} dismissible>{this.state.alertMsg}</Alert> :
              <Alert variant='danger' onClose={this.closeAlert} dismissible>{this.state.alertMsg}</Alert>)
            : <Alert variant='success' onClose={this.closeAlert} dismissible>{this.state.alertMsg}</Alert>
          ) : 
          (this.state.showExpiryAlert ?
              <Alert variant='warning'>{this.state.expiryAlertMsg}</Alert>
            : null
          )
        }

        {this.state.delete ? <DeleteModal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} delete={this.deleteBook} /> : null }

        <h3>Books</h3>
        <BootstrapTable
          keyField='_id' 
          data={ this.state.books } 
          columns={ this.getColumns() }
          striped
          hover
          noDataIndication='There are currently no books'
          pagination={ paginationFactory(this.getOptions()) } />
      </div>
    )
  }
}

export default withRouter(withContext(BookList))
