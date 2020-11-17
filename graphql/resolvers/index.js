const pingsResolvers = require("./pings");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const oauthUsersResolvers = require('./oauthUsers');

module.exports = {
    Ping: {
        supportCount: (parent) => parent.support.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...usersResolvers.Query,
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