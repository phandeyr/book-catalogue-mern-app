import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './navbar'
import LoginForm from './login_form'
import BookList from './book_list'
import PrivateRoute from './private_route'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isAuthenticated: false }
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
        <Navigation />
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
