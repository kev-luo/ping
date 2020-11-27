const {
  AuthenticationError,
  UserInputError,
  withFilter,
} = require("apollo-server");

const Ping = require("../../models/Ping");
const checkAuth = require("../../utils/check-auth");

const NEW_COMMENT = "NEW_COMMENT";

module.exports = {
  Mutation: {
    createComment: async (_, { pingId, body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("empty comment", {
          errors: {
            body: "comment body must not be empty",
          },
        });
      }

      const commentAdded = { body, author: user.id };
      const pingUpdated = await Ping.findOneAndUpdate(
        { _id: pingId },
        { $push: { comments: commentAdded } },
        { new: true }
      )
        .populate("author")
        .populate("comments.author");
      if (pingUpdated) {
        context.pubsub.publish(NEW_COMMENT, {
          pingId: pingId,
          newComment: pingUpdated,
        });
        return pingUpdated;
      } else {
        throw new UserInputError("Ping not found");
      }
    },
    async deleteComment(_, { pingId, commentId }, context) {
      const user = checkAuth(context);
      const ping = await Ping.findById(pingId);

      if (ping) {
        const commentIndex = ping.comments.findIndex(
          (comment) => comment.id === commentId
        );

        if (ping.comments[commentIndex].username === user.username) {
          ping.comments.splice(commentIndex, 1);
          await ping.save();
          return ping;
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } else {
        throw new UserInputError("ping not found");
      }
    },
  },
  Subscription: {
    newComment: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(NEW_COMMENT),
        (payload, args) => {
          console.log(payload);
          console.log(args);
          return payload.pingId === args.pingId
        }
      ),
    },
  },
};
