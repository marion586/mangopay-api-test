const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    user: User!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    getTasks: [Task!]!
    getTask(id: ID!): Task
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createTask(userId: ID!, title: String!, description: String): Task!
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task!
    deleteTask(id: ID!): Task!
  }
`;

module.exports = typeDefs;
