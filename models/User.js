const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  locationList: {
    // list of locations that user has posted a ping from
    type: [String]
  },
  createdAt: {
    type: String,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;