const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const portConfig = require('./config');

async function startApolloServer() {


  const server = new ApolloServer({playground: true, introspection: true, typeDefs, resolvers});
  await server.start();

  const app = express();
//   app.use(bodyParser.json())
    //  .use('/graphql', graphqlExpress({schema}))
    //  .use('/gq', graphqlExpress({endpointURL: '/graphql'}));
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();
