import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './navbar'
import LoginForm from './login_form'
import BookList from './book_list'
import EditBook from './edit_book'
import AddBook from './add_book'
import PrivateRoute from './private_route'
import LocalStorage from '../utils/local_storage'
import AuthContext from '../context/auth_context'
import { Path } from '../utils/paths'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: LocalStorage.isAuthenticated(),
      setAuthentication: this.setAuthentication
    }
  }

  setAuthentication = (auth) => {
    this.setState({ isAuthenticated: auth})
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Router>
        <Navigation />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={LoginForm} />
            <PrivateRoute exact path={Path.BOOKLIST} component={BookList} />
            <PrivateRoute path={Path.ADD_BOOK} component={AddBook} />
            <PrivateRoute path={Path.EDIT_BOOK} component={EditBook} />
          </Switch>
        </div>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App
