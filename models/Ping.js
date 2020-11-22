const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// NOTE: test
const pingSchema = new Schema(
  {
    body: String,
    imageUrl: String,
    longitude: Number,
    latitude: Number,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
        supporter: {
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
  },
  { timestamps: true }
);

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;
