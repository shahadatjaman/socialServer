const Post = require("../../model/Post");

const postValidaion = require("../../validator/post");

module.exports = {
  createPost(req, res) {
    const { id, firstName, lastName, username } = req.user;
    const { body } = req.body;

    if (body || req.fileName) {
      const newPost = new Post({
        userId: id,
        firstName,
        lastName,
        username,
        body,
        postType: "normal",
        comments: [],
        likes: [],
        image:
          typeof req.fileName === "undefined" ? "" : `images/${req.fileName}`,
        createdAt: new Date().toISOString(),
      });

      newPost
        .save()
        .then((data) => {
          return res.status(200).json({
            post: data,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Server error Occurred!",
          });
        });
    } else {
      return res.status(400).json({
        message: "body and imgURL must be provide ",
      });
    }
  },
};
