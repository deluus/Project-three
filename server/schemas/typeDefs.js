const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  # type Player {
  #   _id: ID
  #   name: String
  # }
  # commenting for solutions

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlayer(playerId: Int!): User
    deletePlayer(playerId: Int!): User
  }
`;

module.exports = typeDefs;
