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
    // which ping the comment belongs to
    type: Schema.Types.ObjectId,
  },
  userId: {
    // who posted the comment
    type: Schema.Types.ObjectId,
  },
  hashtagsList: {
    // list of hashtags contained in the ping
    type: [String],
  },
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;