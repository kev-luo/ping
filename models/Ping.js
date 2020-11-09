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
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  userSupportList: {
    type: [Schema.Types.ObjectId],
  },
  comments: {
    type: [Schema.Types.ObjectId],
  },
  totalSupport: {
    type: Number,
  },
  hashtagsList: {
    type: [String],
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
})

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;