const express = require('express')
const path = require('path')
const connection = require('./config/connection')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')
const { authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build' )))
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start()
  server.applyMiddleware({ app })
  
  connection.once('open', async () => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
      console.log(`GraphQL API available at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
};

startApolloServer(typeDefs, resolvers);