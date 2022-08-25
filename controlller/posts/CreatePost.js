const Post = require("../../model/Post");

const postValidaion = require("../../validator/post");

module.exports = {
  createPost(req, res) {
    const { id, firstName, lastName, username } = req.user;
    const { body, imgURL } = req.body;

    if (body || imgURL) {
      const newPost = new Post({
        userId: id,
        firstName,
        lastName,
        username,
        body,
        postType: "imagepost",
        comments: [],
        likes: [],
        image: imgURL,
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
