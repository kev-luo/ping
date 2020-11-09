const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
  pingId: {
    type: Schema.Types.ObjectId,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;