const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// NOTE: test
const userSchema = new Schema(
  {
    name: String,
    picture: String,
    email: String,
    username: String,
    password: String,
    longitude: Number,
    latitude: Number,
    // list of locations that user has posted a ping from
    locationList: [String],
    pings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ping",
      },
    ],
    seenPings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ping",
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
