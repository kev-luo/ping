const { gql } = require("apollo-server");
// NOTE: test
module.exports = gql`
  type Ping {
    id: ID!
    body: String!
    imageUrl: String
    location: Location!
    createdAt: String
    author: User! #NOTE: new
    comments: [Comment!]
    support: [Support!]
    supportCount: Int!
    commentCount: Int!
  }
  type Location {
    type: String!
    coordinates: [Float!]
  }
  type Comment {
    id: ID!
    body: String!
    author: User! #NOTE: new
    createdAt: String
  }
  type Support {
    id: ID!
    supported: Boolean #NOTE: new
    user: User #NOTE: new
  }
  type User {
    id: ID!
    imageUrl: String
    email: String!
    token: String!
    username: String!
    createdAt: String!
    pings: [Ping!]
  }
  # TODO: test case oauth user
  type OauthUser {
    id: ID
    name: String
    email: String
    picture: String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPings: [Ping!] #NOTE: checked
    getPingsByLocation: [Ping!] #NOTE: checking
    getPing(pingId: ID!): Ping #NOTE: checked
    getSupportedPings(userId: ID!): [Ping!] #NOTE: new
    getUsers: [User!] #NOTE: checked
    getUser(userId: ID!): User #NOTE: checked
    me: OauthUser
  }
  type Mutation {
    register(registerInput: RegisterInput): User! #NOTE: checked
    login(username: String!, password: String!): User! #NOTE: checked
    updateUser(imageUrl: String!): User!
    deleteUser(password: String!): String!
    createPing(body: String!, imageUrl: String, lat: Float!, long: Float!): Ping! #NOTE: checked
    deletePing(pingId: ID!): String!
    createComment(pingId: ID!, body: String!): Ping! #NOTE: checked
    deleteComment(pingId: ID!, commentId: ID!): Ping!
    supportPing(pingId: ID!): Ping! #NOTE: checked
    # TODO: test case oauth
  }
  type Subscription {
    newPing: Ping!
    newComment(pingId: ID!): Ping!
  }
`;
