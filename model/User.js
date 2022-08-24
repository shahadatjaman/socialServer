const { model, Schema } = require("mongoose");

const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  lives: String,
  followers: [
    {
      userId: String,
      name: String,
    },
  ],
  following: [
    {
      userId: String,
      name: String,
    },
  ],
  avatars: [
    {
      avatar: String,
      createdAt: String,
    },
  ],
  cover: [
    {
      url: String,
      createdAt: String,
    },
  ],
  notification: [
    {
      postId: String,
      authorId: String,
      senderId: String,
      name: String,
      text: String,
      avatar: String,
      createdAt: String,
      notificationType: String,
      read: Boolean,
    },
  ],
  readNotification: Number,
  isVerified: { type: Boolean, default: false },
});

module.exports = model(
  "User",
  userSchema.index({ name: "text", username: "text" })
);
