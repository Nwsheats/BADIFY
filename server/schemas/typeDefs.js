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
        playlist: [Song]
        listname: String
    }

    type Song {
        _id: ID
        songDay: Int
        songTitle: String
        artistName: String
        songUri: String
        songUrl: String
        songImage: String
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

    type Auth {
        token: ID!
        user: User
    }

    input SongInput {
        _id: String
        songDay: Int
        songTitle: String
        artistName: String
        songUri: String
        songUrl: String
        songImage: String
        recordLabel: String
        releaseYear: Int
        createdAt: String
        submittedBy: String
        comments: [String]
        commentCount: Int
    }

    type Query {
        me: User
        users: [User]
        user(username: String): User
        comments(songId: String, username: String): [Comment]
        comment(_id: String): Comment
        songs: [Song]
        song(_id: String): Song
    
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addComment(commentText: String!, songId: String!, userId: String!): Comment
        removeComment(CommentId: ID!): Comment
        addSongToPlaylist(songId: ID!): User
    #    updatePlaylist(listName: String, songs: [String]): Playlist
        removeSongFromPlaylist(songId: ID!): User
    #  still nee to add updatePlaylist, addSongToPlaylist, removeSongFromPlaylist
    
    }
`;

// query for Spotify Login = get token
// query for Spotify refresh = get token

module.exports = typeDefs;