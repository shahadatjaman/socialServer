const jwt = require("jsonwebtoken");

module.exports = {
  getToket(id, firstName, lastName, username, email) {
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

    return token;
  },
};
