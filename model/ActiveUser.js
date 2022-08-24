// onlineUsers: [
//     {
//       userId: String,
//       socketId: String,
//     },
//   ],

const { model, Schema } = require("mongoose");

const activeUsers = new Schema({
  userId: String,
  socketId: String,
});

module.exports = model("ActiveUser", activeUsers);
