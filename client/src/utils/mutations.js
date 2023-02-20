import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
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
mutation AddComment($commentText: String!, $songId: String!, $userId: String!) {
  addComment(commentText: $commentText, songId: $songId, userId: $userId) {
    _id
    commentText
    songId {
      _id
      artistName
      songTitle
    }
  }
}
`;

export const ADD_SONG_TO_PLAYLIST = gql`
mutation addSongToPlaylist($songId: ID!) {
  addSongToPlaylist(songId: $songId) {
    _id
  }
}
`;

export const REMOVE_SONG_FROM_PLAYLIST = gql`
mutation removeSongFromPlaylist($songId: ID!) {
  removeSongFromPlaylist(songId: $songId) {
    _id
  }
}
`;
