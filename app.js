const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to the database')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to the database')
  })
  .catch((error) => {
    logger.error('error connection to the database:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app