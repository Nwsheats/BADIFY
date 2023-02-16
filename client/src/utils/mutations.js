import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($songTitle: String!, $commentText: String!) {
    addComment(songTitle: $songTitle, commentText: $commentText) {
      _id
      userName
      commentText
      createdAt
      songId{
        _id
      }
    }
  }
`;
// updatePlaylist, addSongToPlaylist, removeSongFromPlaylist,  
