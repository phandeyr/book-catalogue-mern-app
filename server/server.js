require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
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

// Routes
app.use(express.json())
app.use('/users', user)
app.use('/books', book)
app.use('/auth', auth)

app.listen(3000, () => { console.log('server up and running') })
