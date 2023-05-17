const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  title: String,
  description: String,
  url: String,
  releaseDate: Date,
  company: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post",
  }]
});

const Games = model("Games", gameSchema);

module.exports = Games;
