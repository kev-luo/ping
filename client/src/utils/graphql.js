import gql from "graphql-tag";

// NOTE:tested
export const FETCH_PINGS_QUERY = gql`
  {
    getPings {
      id
      body
      imageUrl
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
// NOTE:tested
export const FETCH_PING_QUERY = gql`
  query getPing($pingId: ID!) {
    getPing(pingId: $pingId) {
      id
      body
      imageUrl
      createdAt
      author {
        id
        username
      }
      comments {
        id
        createdAt
        body
        author {
          username
        }
      }
      supportCount
      commentCount
    }
  }
`;
// NOTE:tested
export const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      pings {
        id
        body
        createdAt
        supportCount
        commentCount
      }
    }
  }
`;
// NOTE: new
export const FETCH_SUPPORTED_PINGS_QUERY = gql`
  query getSupportedPings($userId: ID!) {
    getSupportedPings(userId: $userId) {
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
// NOTE:tested
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
// NOTE:tested
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;
export const CREATE_PING = gql`
  mutation createPing($body: String! $imageUrl: String) {
    createPing(body: $body, imageUrl: $imageUrl) {
      id
      body
      imageUrl
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
export const SUPPORT_PING = gql`
  mutation supportPing($pingId: ID!) {
    supportPing(pingId: $pingId) {
      id
    }
  }
`;
// NOTE:tested
export const CREATE_COMMENT = gql`
  mutation createComment($pingId: ID!, $body: String!) {
    createComment(pingId: $pingId, body: $body) {
      id
      comments {
        id
      }
    }
  }
`;
export const DELETE_COMMENT = gql`
  mutation deleteComment($pingId: ID!, $commentId: ID!) {
    deleteComment(pingId: $pingId, commentId: $commentId) {
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
`;
export const DELETE_PING = gql`
  mutation deletePing($pingId: ID!) {
    deletePing(pingId: $pingId)
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($imageUrl: String!){
  updateUser(imageUrl: $imageUrl){
    id
    email
    username
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser($password: String!){
  deleteUser(password: $password)
}
`
