const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  games: {
    type: Schema.Types.ObjectId,
    ref: "Games",
  },
  title: String,
  description: String,
  url: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const Post = model("Post", postSchema);

module.exports = Post;
