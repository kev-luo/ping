const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// NOTE: test
const pingSchema = new Schema(
  {
    body: String,
    imageUrl: String,
    location: {
      type: {
        type: String, 
        enum: ['Point'],
        default: "Point",
        required: true
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: true
      }
    },
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
        supported: Boolean,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    // list of hashtags contained in the ping
    hashtagsList: [String],
  },
  { timestamps: true }
);

pingSchema.indexes({location: '2dsphere'});

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;
