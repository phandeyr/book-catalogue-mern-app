import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import './css/stylesheet.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import '../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)