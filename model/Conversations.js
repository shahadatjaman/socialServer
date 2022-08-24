const { Schema, model } = require("mongoose");

const CONVERSATIONS = new Schema({
  name: String,
  creator_id: Schema.Types.ObjectId,
  participant_id: Schema.Types.ObjectId,
  createdAt: String,
});

module.exports = model("Conversations", CONVERSATIONS);
