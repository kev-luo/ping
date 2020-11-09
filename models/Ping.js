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
  image: {

  },
  locationStamp: {

  },
  timeStamp: {

  },
  userSupportList: {

  },
  comments: {

  },
  totalSupport: {

  },
  hashtagsList: {

  },
  userId: {

  },
})

const Ping = mongoose.model("Ping", pingSchema);

module.exports = Ping;