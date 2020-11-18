import gql from "graphql-tag";

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
`;

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
`;

export const LOGIN_USER = gql`
  mutation login(
    $username: String! 
    $password: String!
  ) {
    login(
      username: $username 
      password: $password
    ) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export const CREATE_PING = gql`
  mutation createPing($body: String!) {
    createPing(body: $body) {
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
 export const FETCH_USER_QUERY= gql`

 query getUser($userId: ID!) {
   getUser(userId: $userId){
     id
     username
   }
 }
 `

 export const SUPPORT_PING = gql`
  mutation supportPing($pingId: ID!) {
    supportPing(pingId: $pingId) {
      id
      support {
        id
        username
      }
      supportCount
    }
  }
 `
