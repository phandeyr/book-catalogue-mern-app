import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './navbar'
import LoginForm from './login_form'
import BookList from './book_list'
import PrivateRoute from './private_route'
import LocalStorage from '../utils/local_storage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isAuthenticated: LocalStorage.isAuthenticated() }
    this.handleState = this.handleState.bind(this)
  }

  handleState(auth) {
    this.setState({
      isAuthenticated: auth
    })
  }

  render() {
    return (
      <Router>
        <Navigation auth={this.state.isAuthenticated}/>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={() => <LoginForm handleState={this.handleState} />}  />
            <PrivateRoute path='/books' component={BookList} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
