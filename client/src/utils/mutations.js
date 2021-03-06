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

export const SAVE_PLAYER = gql`
mutation AddPlayer($playerId: Int!) {
  addPlayer(playerId: $playerId) {
    _id
  }
}`

export const REMOVE_PLAYER = gql`
mutation deletePlayer($playerId: Int!) {
  deletePlayer(playerId: $playerId) {
    _id
  }
}
`
