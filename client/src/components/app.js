import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navigation from './navbar'
import LoginForm from './login_form'
import BookList from './book_list'
import PrivateRoute from './private_route'

function App() {

  return (
      <Router>
        <Navigation/>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={LoginForm} />
            <PrivateRoute path='/books' component={BookList} />
          </Switch>
        </div>
      </Router>
  )
}

export default App
