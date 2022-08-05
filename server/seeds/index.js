const connection = require('../config/connection')
const { User, Todo } = require('../models')


connection.on('open', async () => {
  // delete all users
  await Todo.deleteMany()
  await User.deleteMany()
  // create new user
  await User.create({
    username: 'Scott',
    email: 'scott@gmail.com',
    password: 'secretpass'
  })

  process.exit(0)
})