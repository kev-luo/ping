require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const port = process.env.PORT || 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/pings_db", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to db');
    return server.listen({ port: PORT })
  })
  .then(res => {
    console.log(`Server running at ${ res.url }`)
  })
  .catch(err => {
    console.error(err);
  })