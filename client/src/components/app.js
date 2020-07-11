import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginForm from './login_form'
import BookList from './book_list'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginForm} />
        <Route path='/books' component={BookList} />
      </Switch>
    </Router>
  )
}

export default App
