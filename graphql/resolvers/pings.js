const { AuthenticationError, UserInputError } = require("apollo-server");

const Ping = require("../../models/Ping");
const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPings() {
      try {
        const pings = await Ping.find({})
          .populate({path: "author", populate: { path: "seenPings" }})
          .sort({ createdAt: -1 });
        return pings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPing(_, { pingId }) {
      try {
        const ping = await Ping.findById(pingId).populate("author");
        if (ping) {
          return ping;
        } else {
          throw new Error("ping not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPing(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("post body must not be empty");
      }

      const ping = await new Ping({
        body,
        author: user.id,
      }).save();

      await User.findOneAndUpdate(
        { _id: user.id },
        { $push: { pings: ping._id } }
      );

      const newPing = await Ping.populate(ping, "author");

      context.pubsub.publish("NEW_PING", {
        newPing,
      });

      return newPing;
    },
    async deletePing(_, { pingId }, context) {
      console.log("delete ping");
      const user = checkAuth(context);
      console.log(user);

      try {
        const ping = await Ping.findById(pingId);
        console.log(ping);
        if (user.username === ping.user) {
          await ping.deleteOne();
          return "ping deleted succesfully";
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async supportPing(_, { pingId }, context) {
      const user = checkAuth(context);

      const findPing = await Ping.findOne({_id: pingId})
      if (findPing) {
        await User.findOneAndUpdate({ _id: user.id, seenPings: { $nin: [pingId] }}, { $push: { seenPings: pingId}}, { new: true})

        let ping;

        if(findPing.support.find(supporter => supporter.toString() === user.id)) {
          ping = await Ping.findOneAndUpdate({_id: pingId}, { $pull: { support: user.id }}, { new: true })
          // .populate("support").populate("comments.author");
        } else {
          ping = await Ping.findOneAndUpdate({_id: pingId}, { $push: { support: user.id }}, { new: true})
          // .populate("support").populate("comments.author");
        }

        return ping;
      } else throw new UserInputError("ping not found");
    },
  },
  Subscription: {
    newPing: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_PING"),
    },
  },
};
