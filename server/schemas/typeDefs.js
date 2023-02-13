const { gql } = require('apollo-server-express');

const typeDefs = gql`


    type Auth {
        token: ID!
        user: user
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;