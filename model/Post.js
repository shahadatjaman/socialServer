const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  userId: String,
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  postType: String,
  image: String,
  body: {
    type: String,
    trim: true,
    required: true,
  },

  comments: [
    {
      body: String,
      username: String,
      userId: String,
      avatar: String,
      author: Boolean,
      createdAt: String,
      likes: [
        {
          userId: String,
          createdAt: String,
          reactType: String,
        },
      ],
      reply: [
        {
          userId: String,
          username: String,
          body: String,
          author: Boolean,
          createdAt: String,
        },
      ],
    },
  ],
  privacy: String,
  likes: [
    {
      userId: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  readTime: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: String,
});

module.exports = model("Post", postSchema);
