require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const user = require('./routes/user_route')
const book = require('./routes/book_route')
const auth = require('./routes/auth_route')

// Connect to mongodb
mongoose.connect(process.env.DB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

// Initialise express
const app = express()
app.use(cors())
const port = process.env.PORT || 8000

// Routes
app.use(express.json())
app.use('/users', user)
app.use('/books', book)
app.use('/auth', auth)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => { console.log('server up and running') })
