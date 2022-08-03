import { gql } from '@apollo/client'

export const ALL_USERS = gql`
  query ALL_USERS {
    users {
      _id
      username
      email
    }
  }
`

export const USER = gql`
  query USER($_id: ID, $username: String, $email: String) {
    user(username: $username, _id: $_id, email: $email) {
      _id
      username
      email
    }
  }
`

export const TODO = gql`
  query TODO($_id: ID, $text: String, $complete: Boolean) {
    todo(text: $text, _id: $_id, complete: $complete, createdAt: $createdAt) {
      _id
      text
      complete
    }
  }
`

export const ALL_TODOS = gql`
  query ALL_TODOS {
    todos {
      _id
      text
      createdAt
      complete
    }
  }
`