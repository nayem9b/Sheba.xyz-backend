import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    signup(
      name: String!,
      email: String!,
      password: String!,
      bio: String
    ): AuthPayload
    
    signin(
      email: String!
      password: String!
    ): AuthPayload
  }

  type User {
    id: ID!
    name: String!
    email: String!
    bio: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;
