const { AuthenticationError, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");

const Ping = require("../../models/Ping");
const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");

const NEW_PING = "NEW_PING";

module.exports = {
  Query: {
    async getPings() {
      try {
        const pings = await Ping.find({})
          .populate("author")
          .populate({ path: "support", populate: { path: "user" } })
          .sort({ createdAt: -1 });
        return pings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPingsByLocation(_, { long, latt }) {
      console.log(long, latt);
      try {
        const pings = await Ping.find({location: {
          $near: {
           $maxDistance: 10000000,
           $geometry: {
            type: "Point",
            coordinates: [long, latt]
           }
          }
         }})
          .populate("author")
          .populate({ path: "support", populate: { path: "user" } })
          .sort({ createdAt: -1 });
          // pings.map(ping => console.log(ping.location));
        return pings;

      } catch (err) {
        throw new Error(err);
      }
    },
    async getPing(_, { pingId }) {
      try {
        const ping = await Ping.findById(pingId)
          .populate("author")
          .populate("comments.author");
        if (ping) {
          return ping;
        } else {
          throw new Error("ping not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    
    // NOTE: might not need this...
    async getSupportedPings(_, { userId }) {
      try {
        const supportedPings = await Ping.find({
          $and: [
            { "support.user": mongoose.Types.ObjectId(userId) },
            { "support.supported": true },
          ],
        })
          .populate("author")
          .populate("support.user");
        return supportedPings;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPing(_, { body, imageUrl, lat, long }, context) {
      const user = checkAuth(context);

      console.log(body);

      if (body.trim() === "") {
        throw new Error("post body must not be empty");
      }

      // log the coordinates to send to the db

      const ping = await new Ping({
        body,
        imageUrl,
        location:{
          coordinates:[long, lat]
        },
        author: user.id,
      }).save();

      await User.findOneAndUpdate(
        { _id: user.id },
        { $push: { pings: ping._id } }
      );

      await Ping.populate(ping, "author");
      await Ping.populate(ping, "support.user");

      context.pubsub.publish(NEW_PING, {
        newPing: ping,
      });

      return ping;
    },
    async deletePing(_, { pingId }, context) {
      const user = checkAuth(context);

      try {
        const ping = await Ping.findById(pingId);
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
      // find out if the ping exists
      const findPing = await Ping.findOne({ _id: pingId });
      if (findPing) {
        // find out if the current user has already interacted with the ping. returns object in support array of ping
        const currentUser = findPing.support.find((currentPing) => {
          return currentPing.user.toString() === user.id;
        });

        if (currentUser) {
          // if current user has interacted with the ping, remove the user from the supported list
          await Ping.findOneAndUpdate(
            { _id: pingId },
            { $pull: { support: { user: user.id } } },
            { new: true }
          );
          // re-add user with inverted boolean value
          const updatePing = await Ping.findOneAndUpdate(
            { _id: pingId },
            {
              $push: {
                support: { user: user.id, supported: !currentUser.supported },
              },
            },
            { new: true }
          )
            .populate("author")
            .populate("support.user");

          return updatePing;
        } else {
          const updatePing = await Ping.findOneAndUpdate(
            { _id: pingId },
            { $push: { support: { user: user.id, supported: true } } },
            { new: true }
          )
            .populate("author")
            .populate("support.user");

          return updatePing;
        }
      } else throw new UserInputError("ping not found");
    },
  },
  Subscription: {
    newPing: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_PING),
    },
  },
};
