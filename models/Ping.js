const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pingSchema = new Schema({
  title: {
    // do we actually need a ping title?
    type: String,
    trim: true,
  },
  body: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  locationStamp: {
    // where the ping was posted from
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  userSupportList: [
    // list of users who've supported this ping
    {
      user: { type: Schema.Types.ObjectId },
      supportStatus: { type: Boolean }
    }
  ],
  comments: {
    // list of comments associated with this ping
    type: [Schema.Types.ObjectId],
  },
  totalSupport: {
    type: Number,
  },
  hashtagsList: {
    // list of hashtags contained in the ping
    type: [String],
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
})

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;