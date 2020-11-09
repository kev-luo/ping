const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {

  },
  image: {

  },
  pingId: {

  },
  userId: {

  },
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;