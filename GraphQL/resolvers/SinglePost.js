const Post = require("../../model/Post");

const { UserInputError } = require("apollo-server-express");

module.exports = {
  Query: {
    async getSinglePost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
