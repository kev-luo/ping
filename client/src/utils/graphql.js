import gql from 'graphql-tag';

export const FETCH_PINGS_QUERY = gql`
{
  getPings {
    id
    body
    createdAt
    user
    comments {
      id
      createdAt
      username
      body
    }
    support {
      id
      createdAt
      username
    }
    supportCount
    commentCount
  }
}
`

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`