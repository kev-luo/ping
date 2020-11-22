const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pingSchema = new Schema({
  body: String,
  imageUrl: String,
  longitude: Number,
  latitude: Number,
  createdAt: String,
  comments: [
    {
      body: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      commentHash: [String],
    },
  ],
  support: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  // list of hashtags contained in the ping
  hashtagsList: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;
