import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($_id: ID!) {
        user(_id: $id) {
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
        _id
        songDay
        songTitle
        artistName
        recordLabel
        releaseYear
        createdAt
        submittedBy
        songUri
        songUrl
        songImage
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
            commentText
            username
            }
        }
}
`;

export const QUERY_COMMENT =gql`
    query comment($id: String!){
        song(_id: $id){
        _id
        username
        commentText
        createdAt
        songId
        }
    }
`;

export const QUERY_COMMENTS = gql`
    query comments($songId: String!){
        song(songId: $songId){
            comments {
                _id
                username
                commentText
                createdAt
                user {
                    username
                }
                songId {
                    _id
                    songTitle
                    artistName
                    songImage
                    songUrl
                    songDay
                    comments {
                        _id
                        username
                        commentText
                        createdAt
                        songId {
                            _id
                            songTitle
                            artistName
                            songImage
                            songUrl
                            songDay
                    }
                }
            }
        }
    }
}
`;

// export const QUERY_PLAYLIST = gql`
//     query playlist($id: String!){
//         song(_id: $id){
//         username
//         listName
//         createdAt
//         songs
//         }
//     }
// `;

export const QUERY_ME = gql`
    {
    me {
        _id
        createdAt
        email
        listname
        password
        username
        playlist {
            _id
            artistName
            commentCount
            createdAt
            recordLabel
            releaseYear
            songDay
            songImage
            songTitle
            songUri
            songUrl
            submittedBy
        }
        comments {
            _id
            commentText
            createdAt
            username
        }
    }
}
`;