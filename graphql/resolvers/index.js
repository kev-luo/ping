const pingsResolvers = require("./pings");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...pingsResolvers.Query
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