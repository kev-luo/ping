import gql from "graphql-tag";

// NOTE: FeedType
export const FETCH_PINGS_QUERY = gql`
  {
    getPings {
      id
      body
      imageUrl
      createdAt
      author {
        id
        imageUrl
        username
      }
      support {
        supported
        user {
          id
        }
      }
      supportCount
      commentCount
    }
  }
`;
// NOTE: Ping
export const FETCH_PING_QUERY = gql`
  query getPing($pingId: ID!) {
    getPing(pingId: $pingId) {
      id
      body
      imageUrl
      createdAt
      author {
        id
        imageUrl
        username
      }
      comments {
        id
        createdAt
        body
        author {
          id
          username
          imageUrl
        }
      }
      supportCount
    }
  }
`;
// NOTE: UserContainer
export const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      imageUrl
      pings {
        id
        body
        imageUrl
        createdAt
        supportCount
        commentCount
      }
    }
  }
`;
// NOTE: Register
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
// NOTE: Login
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      imageUrl
      token
      username
      createdAt
    }
  }
`;
// NOTE: NewPing
export const CREATE_PING = gql`
  mutation createPing($body: String!, $imageUrl: String) {
    createPing(body: $body, imageUrl: $imageUrl) {
      id
      body
      imageUrl
      createdAt
      author {
        id
        imageUrl
        username
      }
      support {
        supported
        user {
          id
        }
      }
      supportCount
      commentCount
    }
  }
`;
// NOTE: SupportPing
export const SUPPORT_PING = gql`
  mutation supportPing($pingId: ID!) {
    supportPing(pingId: $pingId) {
      id
      body
      imageUrl
      createdAt
      author {
        id
        username
      }
      support {
        id
        supported
        user {
          username
        }
      }
      supportCount
      commentCount
    }
  }
`;
// NOTE:NewComment
export const CREATE_COMMENT = gql`
  mutation createComment($pingId: ID!, $body: String!) {
    createComment(pingId: $pingId, body: $body) {
      id
      body
      imageUrl
      createdAt
      author {
        id
        imageUrl
        username
      }
      comments {
        id
        createdAt
        body
        author {
          id
          username
          imageUrl
        }
      }
      supportCount
    }
  }
`;
// NOTE: UserSettings
export const UPDATE_USER = gql`
  mutation updateUser($imageUrl: String!) {
    updateUser(imageUrl: $imageUrl) {
      id
      email
      username
    }
  }
`;
// NOTE: UserSettings
export const DELETE_USER = gql`
  mutation deleteUser($password: String!) {
    deleteUser(password: $password)
  }
`;
// NOTE: FeedType
export const NEW_PING_SUBSCRIPTION = gql`
  subscription {
    newPing {
      id
      body
      imageUrl
      createdAt
      author {
        id
        imageUrl
        username
      }
      support {
        supported
        user {
          id
        }
      }
      supportCount
      commentCount
    }
  }
`;
// NOTE: Ping
export const NEW_COMMENT_SUBSCRIPTION = gql`
  subscription($pingId: ID!) {
    newComment(pingId: $pingId) {
      id
      body
      imageUrl
      createdAt
      author {
        id
        imageUrl
        username
      }
      comments {
        id
        createdAt
        body
        author {
          id
          username
          imageUrl
        }
      }
      supportCount
    }
  }
`;
