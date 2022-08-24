const { Schema, model } = require("mongoose");

const COMMENTS = new Schema({
  userId: String,
  postId: String,
  text: String,
  likes: [
    {
      userId: String,
      commentId: String,
      reactType: String,
      createdAt: String,
    },
  ],
  reply: [],
  createdAt: String,
});

module.exports = model("Comment", COMMENTS);
