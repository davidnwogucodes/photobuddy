const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String,
  description: String,
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
