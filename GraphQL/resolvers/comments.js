const { UserInputError } = require("apollo-server-express");

const Post = require("../../model/Post");

const User = require("../../model/User");

const authChecker = require("../../utils/auth-checker");

const Comment = require("../../model/Comments");

module.exports = {
  Query: {
    async getCommentAvatar(_, { userId }) {
      // const user = AuthChecker(context);
      let user = await User.findById(userId);
      if (user) {
        return {
          avatar: user.avatars[0].avatar,
          isStock: 1,
        };
      } else {
        return {
          avatar: "",
          isStock: 0,
        };
      }
    },
    async getReply(_, { postId, commentId }, context) {
      // authChecker(context);
      const post = await Post.findById(postId);

      const comment = await post.comments.find(
        (comment) => comment._id.toString() === commentId
      );

      return comment.reply;
    },
  },
  Mutation: {
    async createComment(_, { userId, postId, text }, context) {
      // authChecker(context);

      if (text.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      let post = await Post.findById(postId);

      if (post) {
        const comment = {
          userId: userId,
          postId,
          text,
          likes: [],
          createdAt: new Date().toISOString(),
        };
        let newCommnet = new Comment(comment);
        await newCommnet.save();

        return comment;
      } else throw new UserInputError("Requested post was not found");
    },
    async reactionTocomment(_, { commentId, userId, type }, context) {
      const comment = await Comment.findById(commentId);

      if (comment) {
        if (comment.likes.find((like) => like.userId === userId)) {
          comment.likes = comment.likes.filter((c) => c.userId !== userId);

          await comment.save();

          return comment;
        } else {
          comment.likes.push({
            userId,
            commentId,
            reactType: type,
            createdAt: new Date().toISOString(),
          });

          await comment.save();
          return comment;
        }
      } else throw new UserInputError("Requested comment was'nt found!");
    },
  },
};
