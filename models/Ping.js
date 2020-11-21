const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pingSchema = new Schema({
  body: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  longitude: {
    // where the ping was posted from
    type: Number,
  },
  latitude: {
    // where the ping was posted from
    type: Number,
  },
  createdAt: {
    type: String,
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      commentHash: {
        type: [String],
      },
    },
  ],
  support: [
    {
      username: String,
      createdAt: String,
    },
  ],
  hashtagsList: {
    // list of hashtags contained in the ping
    type: [String],
  },
  user: {
    type: String,
  },
});

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;
