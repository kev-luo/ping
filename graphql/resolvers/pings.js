const { AuthenticationError, UserInputError } = require("apollo-server");

const Ping = require("../../models/Ping");
const checkAuth = require("../../utils/check-auth");

module.exports = {
    Query: {
        async getPings() {
            console.log("get pings");
            try {
                const pings = await Ping.find({}).sort({ createdAt: -1 });
                return pings;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPing(_, { pingId }) {
            try {
                const ping = await Ping.findById(pingId);
                if (ping) {
                    return ping
                } else {
                    throw new Error("ping not found")
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPing(_, { body }, context) {
            console.log("create ping");
            const user = checkAuth(context);
            console.log(user);

            if (body.trim() === "") {
                throw new Error("post body must not be empty")
            }

            const newPing = new Ping({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const ping = await newPing.save();

            context.pubsub.publish("NEW_PING", {
                newPing: ping
            })

            return ping;
        },
        async deletePing(_, { pingId }, context) {
            console.log("delete ping");
            const user = checkAuth(context);

            try {
                const ping = await Ping.findById(pingId);
                if (user.username === ping.username) {
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
            console.log("support ping");
            const user = checkAuth(context);

            const ping = await Ping.findById(pingId);
            if (ping) {

                if (ping.support.find(support => support.username === user.username)) {
                    ping.support = ping.support.filter(support => support.username !== user.username);
                } else {
                    ping.support.push({
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                }

                await ping.save();
                return ping;
            } else throw new UserInputError("ping not found");
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_,_, { pubsub }) => pubsub.asyncIterator("NEW_POST")
        }
    }
}