const { Schema, model } = require("mongoose");

const MESSAGE = new Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  sender: Schema.Types.ObjectId,
  receiver: Schema.Types.ObjectId,
  createdAt: String,
});

module.exports = model("Message", MESSAGE);
