const User = require("../../model/User");

const fs = require("fs");
module.exports = {
  avatar(req, res) {
    const { userId } = req.params;

    const fileName = req.fileName;

    // Find user
    User.findById(userId)
      .then((user) => {
        if (user) {
          user.avatars.unshift({
            avatar: `images/${fileName}`,
            createdAt: new Date().toISOString(),
          });
          user.save();
          return res.status(200).json({ user });
        }

        fs.unlink(__dirname + `../../../files/${fileName}`, function (err) {
          if (err) return res.status(500).json({ err });
          res.status(404).json({
            message: "Invalid user ID!",
          });
        });
      })
      .catch((error) => {
        res.status(500).json({ message: "Server error occured!" });
      });
  },
};
