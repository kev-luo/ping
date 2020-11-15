const pingsResolvers = require("./pings");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const oauthUsersResolvers = require('./oauthUsers');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...pingsResolvers.Query,
        ...oauthUsersResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...pingsResolvers.Mutation,
        ...commentsResolvers.Mutation,
    },
    Subscription: {
        ...pingsResolvers.Subscription,
    }
}