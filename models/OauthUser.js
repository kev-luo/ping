const mongoose = require('mongoose');

const oauthUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
})

module.exports = mongoose.model("OauthUser", oauthUserSchema);