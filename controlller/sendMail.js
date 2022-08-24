const nodemailer = require("nodemailer");

const sendMail = require("../utils/sendMail");

module.exports = {
  async verifyAccount(req, res) {
    let { email, subject, url, token } = req.body;

    if (!email && !subject && !url && !token) {
      res.status(400).json({
        message: "Email subject url and token must not be empty",
      });
    }

    await sendMail(email, subject, url);

    res.status(200).json(token);
  },
};
