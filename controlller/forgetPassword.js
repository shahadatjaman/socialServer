const User = require("../model/User");

const jwt = require("jsonwebtoken");

const sendMail = require("../utils/sendMail");

const { emailSenderValidator } = require("../utils/EmailValidator");

module.exports = {
  async forgotPassword(req, res) {
    let { email, subject, url } = req.body;

    let errors = emailSenderValidator(email, subject, url);

    if (!errors.isValid) {
      return res.status(400).json(errors);
    }

    if (!email && !subject && !url) {
      res.status(400).json({
        message: "Email subject url and token must not be empty",
      });
    }
    let user = await User.findOne({ email });

    if (user) {
      // token genaret
      const token = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email,
          isVerified: user.isVerified,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      url = `${url}/${token}`;
      await sendMail(email, subject, url);
      return res.status(200).json(token);
    } else {
      return res.status(404).json({
        message: "User not found!",
      });
    }
  },
};
