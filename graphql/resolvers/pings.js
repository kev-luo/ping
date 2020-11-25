// const { AuthenticationError, UserInputError } = require("apollo-server");
// const mongoose = require("mongoose");

// const Ping = require("../../models/Ping");
// const User = require("../../models/User");
// const checkAuth = require("../../utils/check-auth");

// module.exports = {
//   Query: {
//     async getPings() {
//       try {
//         const pings = await Ping.find({})
//           .populate("author")
//           .sort({ createdAt: -1 });
//         return pings;
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//     async getPing(_, { pingId }) {
//       try {
//         const ping = await Ping.findById(pingId)
//           .populate("author")
//           .populate({ path: "comments", populate: { path: "author" } });
//         if (ping) {
//           return ping;
//         } else {
//           throw new Error("ping not found");
//         }
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//     // NOTE: might not need this...
//     async getSupportedPings(_, { userId }) {
//       try {
//         const supportedPings = await Ping.find({
//           $and: [
//             { "support.user": mongoose.Types.ObjectId(userId) },
//             { "support.supported": true },
//           ],
//         }).populate("author");
//         return supportedPings;
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//   },
//   Mutation: {
//     async createPing(_, { body, imageUrl }, context) {
//       const user = checkAuth(context);

//       if (body.trim() === "") {
//         throw new Error("post body must not be empty");
//       }

//       const ping = await new Ping({
//         body,
//         imageUrl,
//         author: user.id,
//       }).save();

//       await User.findOneAndUpdate(
//         { _id: user.id },
//         { $push: { pings: ping._id } }
//       );

//       const newPing = await Ping.populate(ping, "author");

//       context.pubsub.publish("NEW_PING", {
//         newPing,
//       });

//       return newPing;
//     },
//     async deletePing(_, { pingId }, context) {
//       console.log("delete ping");
//       const user = checkAuth(context);
//       console.log(user);

//       try {
//         const ping = await Ping.findById(pingId);
//         console.log(ping);
//         if (user.username === ping.user) {
//           await ping.deleteOne();
//           return "ping deleted succesfully";
//         } else {
//           throw new AuthenticationError("action not allowed");
//         }
//       } catch (err) {
//         throw new Error(err);
//       }
//     },
//     async supportPing(_, { pingId }, context) {
//       const user = checkAuth(context);
//       // find out if the ping exists
//       const findPing = await Ping.findOne({ _id: pingId });
//       if (findPing) {
//         // find out if the current user has already interacted with the ping. returns object in support array of ping
//         const currentUser = findPing.support.find((currentPing) => {
//           return currentPing.user.toString() === user.id;
//         });

//         if (currentUser) {
//           // if current user has interacted with the ping, remove the user from the supported list
//           await Ping.findOneAndUpdate(
//             { _id: pingId },
//             { $pull: { support: { user: user.id } } },
//             { new: true }
//           );
//           // re-add user with inverted boolean value
//           const updatePing = await Ping.findOneAndUpdate(
//             { _id: pingId },
//             {
//               $push: {
//                 support: { user: user.id, supported: !currentUser.supported },
//               },
//             },
//             { new: true }
//           )
//             .populate("author")
//             .populate({ path: "support", populate: { path: "user" } });

//           return updatePing;
//         } else {
//           const updatePing = await Ping.findOneAndUpdate(
//             { _id: pingId },
//             { $push: { support: { user: user.id, supported: true } } },
//             { new: true }
//           )
//             .populate("author")
//             .populate({ path: "support", populate: { path: "user" } });

//           return updatePing;
//         }
//       } else throw new UserInputError("ping not found");
//     },
//   },
//   Subscription: {
//     newPing: {
//       subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_PING"),
//     },
//   },
// };

const{AuthenticationError,UserInputError}=require("apollo-server"),mongoose=require("mongoose"),Ping=require("../../models/Ping"),User=require("../../models/User"),checkAuth=require("../../utils/check-auth");module.exports={Query:{async getPings(){try{const a=await Ping.find({}).populate("author").sort({createdAt:-1});return a}catch(a){throw new Error(a)}},async getPing(a,{pingId:b}){try{const a=await Ping.findById(b).populate("author").populate({path:"comments",populate:{path:"author"}});if(a)return a;throw new Error("ping not found")}catch(a){throw new Error(a)}},async getSupportedPings(a,{userId:b}){try{const a=await Ping.find({$and:[{"support.user":mongoose.Types.ObjectId(b)},{"support.supported":!0}]}).populate("author");return a}catch(a){throw new Error(a)}}},Mutation:{async createPing(a,{body:b,imageUrl:c},d){const e=checkAuth(d);if(""===b.trim())throw new Error("post body must not be empty");const f=await new Ping({body:b,imageUrl:c,author:e.id}).save();await User.findOneAndUpdate({_id:e.id},{$push:{pings:f._id}});const g=await Ping.populate(f,"author");return d.pubsub.publish("NEW_PING",{newPing:g}),g},async deletePing(a,{pingId:b},c){console.log("delete ping");const d=checkAuth(c);console.log(d);try{const a=await Ping.findById(b);if(console.log(a),d.username===a.user)return await a.deleteOne(),"ping deleted succesfully";throw new AuthenticationError("action not allowed")}catch(a){throw new Error(a)}},async supportPing(a,{pingId:b},c){const d=checkAuth(c),e=await Ping.findOne({_id:b});if(e){const a=e.support.find(a=>a.user.toString()===d.id);if(a){await Ping.findOneAndUpdate({_id:b},{$pull:{support:{user:d.id}}},{new:!0});const c=await Ping.findOneAndUpdate({_id:b},{$push:{support:{user:d.id,supported:!a.supported}}},{new:!0}).populate("author").populate({path:"support",populate:{path:"user"}});return c}else{const a=await Ping.findOneAndUpdate({_id:b},{$push:{support:{user:d.id,supported:!0}}},{new:!0}).populate("author").populate({path:"support",populate:{path:"user"}});return a}}else throw new UserInputError("ping not found")}},Subscription:{newPing:{subscribe:(a,b,{pubsub:c})=>c.asyncIterator("NEW_PING")}}};