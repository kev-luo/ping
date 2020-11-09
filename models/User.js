const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  location: {
    type: String,
  },
  totalSupport: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
  },
  profilePicUrl: {
    type: String
  },
  locationList: {
    // list of locations that user has posted a ping from
    type: [String]
  },
})

const User = mongoose.model("User", userSchema);

module.exports = User;