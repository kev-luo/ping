const { AuthenticationError , UserInputError } = require("apollo-server");

const Ping = require("../../models/Ping");
const checkAuth = require("../../utils/check-auth");

module.exports = {
    Mutation: {
        createComment: async(_, { pingId, body }, context) => {
            const user = checkAuth(context);

            if(body.trim() === "") {
                throw new UserInputError("empty comment", {
                    errors: {
                        body: "comment body must not be empty"
                    }
                })
            }

            const ping = await Ping.findById(pingId);

            if(ping) {
                ping.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                await ping.save();
                return ping;
            } else throw new UserInputError("post not found");
        },
        async deleteComment(_, { pingId, commentId }, context) {
            const user = checkAuth(context);
            const ping = await Ping.findById(pingId);

            if(ping) {
                const commentIndex = ping.comments.findIndex(comment => comment.id === commentId);

                if(ping.comments[commentIndex].username === user.username) {
                    ping.comments.splice(commentIndex, 1);
                    await ping.save();
                    return ping;
                } else {
                    throw new AuthenticationError("action not allowed");
                }
            } else {
                throw new UserInputError("ping not found")
            }
        }
    }
}