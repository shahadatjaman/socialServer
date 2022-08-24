const { model, Schema } = require("mongoose");

const NOTI = new Schema({
  sender: String,
  receiver: String,
  notiType: String,
  content: String,
  refId: String,
  isRead: Boolean,
  createdAt: String,
});

module.exports = model("Notification", NOTI);
