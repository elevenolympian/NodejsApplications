const {makeExecutableSchema} = require('@graphql-tools/schema')

  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      mails: [Mail]
      mail(subject: String!, receiver: String!): Mail
    }

    type Mutation {
      mail(subject: String!, receiver: String!, content: String!): Mail
    }

    type Mail {
      subject: String 
      receiver: String 
      content: String
      _id: String
    }
  `;
//you can use custom types with typeDefs
  module.exports = makeExecutableSchema({typeDefs, resolvers}); 
