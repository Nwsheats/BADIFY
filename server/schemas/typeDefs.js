const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        firstname: String
        lastname: String
        email: String
        password: String
        createdAt: String
        comments: [Comment]
    }

    type Song {
        _id: ID
        songDay: Int
        songTitle: String
        artistName: String
        recordLabel: String
        releaseYear: Int
        createdAt: String
        submittedBy: String
        comments: [Comment]
        commentCount: Int
    }

    type Comment {
        _id: ID
        username: String
        commentText: String
        createdAt: String
        songId: [Song]
    }

    type Playlist {
       user_id: ID!
       listName: String
        createdAt: String
        songs: [Song] 
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query {
        users: [User]
        user(username: String): User
        comments(songId: String, username: String): [Comment]
        comment(_id: String): Comment
        playlist(_id: String): Playlist
        songs: [Song]
        song(_id: String): Song
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addComment(commentText: String!, songId: String!, userName: String!): Comment
#  still nee to add updatePlaylist, addSongToPlaylist, removeSongFromPlaylist

    }
`;

// query for Spotify Login = get token
// query for Spotify refresh = get token

module.exports = typeDefs;