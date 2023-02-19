import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
        _id
        username
        firstname
        lastname
        email
        comments {
            _id
            userName
            commentText
            createdAt
            songId
            }
        }
    }
`;

export const QUERY_SONG = gql`
    query song($id: String!){
        song(_id: $id){
        ID
        songDay
        songTitle
        artistName
        recordLabel
        releaseYear
        createdAt
        submittedBy
        comments
        commentCount
        }
    }
`;

export const QUERY_SONGS =gql`
    {
    songs {
        _id
        artistName
        songDay
        songTitle
        submittedBy
        songUri
        songUrl
        songImage
        createdAt
        releaseYear
        recordLabel
        commentCount
        comments {
            _id
        }
    }
}
`;

export const QUERY_COMMENT =gql`
    query comment($id: String!){
        song(_id: $id){
        ID
        userName
        commentText
        createdAt
        songId
        }
    }
`;

export const QUERY_COMMENTS = gql`
    query comments($songId: String!, $username: String!){
        song(songId: $songId, username: $username){
        ID
        userName
        commentText
        createdAt
        songId
        }
    }
`;

export const QUERY_PLAYLIST = gql`
    query playlist($id: String!){
        song(_id: $id){
        username
        listName
        createdAt
        songs
        }
    }
`;

export const QUERY_ME = gql`
{
    me {
    _id
    username
    email
    friendCount
    thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
        _id
        createdAt
        reactionBody
        username
        }
    }
    friends {
        _id
        username
    }
    }
}
`;