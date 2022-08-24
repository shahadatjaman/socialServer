const User = require("../model/User");

const jwt = require("jsonwebtoken");

module.exports = {
  async userActive(req, res) {
    let { email } = req.body;

    if (email) {
      let user = await User.findOne({ email: email });

      if (user.isVerified) {
        return res.status(500).json({
          message: "Something went wrong!",
        });
      }

      user.isVerified = true;

      await user.save();
      // Genarate Toke
      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      res.status(200).json({
        token,
      });
    } else {
      res.send("Email must be provide");
    }
  },
};
