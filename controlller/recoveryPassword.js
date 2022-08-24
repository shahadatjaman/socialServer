const User = require("../model/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { resourcError } = require("../Errors/errorsHandling");

module.exports = {
  async recoveryPassword(req, res) {
    let { email, password } = req.body;

    if (email && password) {
      const hash = await bcrypt.hash(password, 10);

      let user = await User.findOneAndUpdate(
        { email },
        { password: hash },
        { new: true, upsert: true }
      );

      //   Token Genarate

      const token = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      return res.status(200).json({
        token,
      });
    }
    return resourcError(res, "Email and password must provided!");
  },
};
