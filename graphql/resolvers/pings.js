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
            } catch(err) {
                throw new Error(err);
            }
        },
        async getPing(_, { pingId }) {
            try {
                const ping = await Ping.findById(pingId);
                if(ping) {
                    return ping
                } else {
                    throw new Error("ping not found")
                } 
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPing(_, { body }, context ) {
            console.log("create ping");
            const user = checkAuth(context);
            console.log(user);

            if(body.trim() === "") {
                throw new Error("post body must not be empty")
            }

            const newPing = new Ping({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });
        }
    }
}