const { Schema, Model } = require("mongoose");

const token = new Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = Model("Token", token);
