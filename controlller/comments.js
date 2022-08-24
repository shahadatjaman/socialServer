const Comment = require("../model/Comments");

const Post = require("../model/Post");

const commentValidaion = require("../validator/comment");
module.exports = {
  async getComments(req, res) {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (post) {
      const totaNumberOfComment = await Comment.find({ postId }).count();
      const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

      if (comments) {
        return res.status(200).json({
          comments,
          totall: totaNumberOfComment,
        });
      }
    }

    return res.status(404).json({ message: "Requested post was not found!" });
  },
  async reactionToComment(req, res) {
    const { commentId, userId, type } = req.params;
    const comment = await Comment.findById(commentId);

    if (comment) {
      if (comment.likes.find((like) => like.userId === userId)) {
        return res.json({
          message: "Already Liked",
        });
      } else {
        comment.likes.push({
          userId,
          commentId,
          reactType: type,
          createdAt: "String",
        });
        console.log(comment);
        // await comment.save();
        return res.status(200).json({
          comment,
        });
      }
    }

    return res.status(400).json({
      message: "Comment not found!",
    });
  },
};
