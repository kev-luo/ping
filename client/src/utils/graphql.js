import gql from "graphql-tag";

export const FETCH_PINGS_QUERY = gql`
  {
    getPings {
      id
      body
      createdAt
      author {
        id
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
      author {
        id
        username
      }
      supportCount
      commentCount
    }
  }
`
export const FETCH_USER_QUERY = gql`
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
    }
  }
 `
export const DELETE_COMMENT = gql`
  mutation deleteComment(
    $pingId: ID!
    $commentId: ID!
  ) {
    deleteComment(
      pingId: $pingId
      commentId: $commentId
    ) {
        id
        comments {
          id
          username
          createdAt
          body
        }
        commentCount
    }
  }

`
export const DELETE_PING = gql`
  mutation deletePing($pingId: ID!) {
    deletePing(pingId: $pingId)
  }
`
export const FETCH_PING_QUERY = gql`
query getPing($pingId: ID!){
  getPing(pingId: $pingId){
    id
    body
    createdAt
    user
    comments{
      id 
      createdAt
      username
      body
    }
    supportCount
    commentCount
  }
}
`
export const CREATE_COMMENT = gql`
mutation createComment(
  $pingId: ID!
  $body: String!
){
  createComment(
    pingId: $pingId
    body: $body
  ){
    id
        comments {
          id
          username
          createdAt
          body
        }
        commentCount
  }
}
`