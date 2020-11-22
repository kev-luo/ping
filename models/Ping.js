const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// NOTE: test
const pingSchema = new Schema({
  body: String,
  imageUrl: String,
  longitude: Number,
  latitude: Number,
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
}, { timestamps: true });

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;
