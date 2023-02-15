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

export const QUERY_SONG =gql`
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
// need help with this one linking it back to server/typeDefs
export const QUERY_COMMENTS =gql`
    query comments($songId: String!){
        song(songId: $songId){
        ID
        userName
        commentText
        createdAt
        songId
        }
    }
`;

export const QUERY_PLAYLIST =gql`
    query playlist($id: String!){
        song(_id: $id){
        username
        listName
        createdAt
        songs
        }
    }
`;