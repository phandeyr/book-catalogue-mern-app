require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// Connect to mongodb
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Initialise express
const app = express()

// Routes
const user = require('./routes/user_route');
app.use(express.json())
app.use('/users', user)

app.listen(3000, () => { console.log('server up and running') })