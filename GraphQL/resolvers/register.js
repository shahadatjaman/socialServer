const User = require("../../model/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { SECRET_KEY } = require("../../config");

const { UserInputError } = require("apollo-server-express");

const { validateRegisterInput } = require("../../utils/validator");

module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          avatars,
        },
      }
    ) {
      const { valid, errors } = validateRegisterInput(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      const userr = await User.findOne({ email });

      if (userr) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This Email is taken",
          },
        });
      }

      // hash password
      password = await bcrypt.hash(password, 10);

      const random = Math.floor(1000 + Math.random() * 9000);

      const username = firstName.concat(lastName).toLowerCase() + random;

      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password,
        avatars: [
          {
            avatar: process.env.AVATAR,
          },
        ],
        cover: [
          {
            url: process.env.COVER,
          },
        ],
        bio: "",
        lives: "",
        notification: [],
        readNotification: 0,
        followers: [],
        following: [],
      });

      const user = await newUser.save();

      // token genaret
      const token = jwt.sign(
        {
          id: user.id,
          firstName,
          lastName,
          username: user.username,
          email,
          isVerified: user.isVerified,
        },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      return {
        ...user._doc,
        user,
        id: user.id,
        token,
      };
    },
  },
};
