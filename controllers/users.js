const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password) {
    return response.status(401).json({
        error: `password is required`})
  }
  if (password.length < config.PSW_MIN_LENGTH) {
    return response.status(401).json({
      error: `minimum password length is ${config.PSW_MIN_LENGTH} characters`})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate( 'blogs', { title: 1, author: 1, likes: 1, url: 1 } )
    response.json(users)
})

module.exports = usersRouter