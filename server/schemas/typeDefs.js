const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        firstname: String
        lastname: String
        email: String
        createdAt: String
        comments: [Comment]
    }

    type Song {
        _id: ID
        songDay: Number
        songTitle: String
        artistName: String
        recordLabel: String
        releaseYear: Number
        createdAt: String
        submittedBy: String
        comments: [Comment]
        commentCount: Number
    }

    type Comment {
        userName: String
        commentText: String
        createdAt: String
        songId: [Song]
    }

    type Playlist {
        username: String
        listName: String
        createdAt: String
        songs: [Song] 
    }

    type Auth {
        token: ID!
        user: user
    }

    type Query {
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
       
    }
`;

module.exports = typeDefs;