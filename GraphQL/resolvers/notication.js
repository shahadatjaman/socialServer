const { UserInputError } = require("apollo-server-core");
const Notifications = require("../../model/Notifications");

const authChecker = require("../../utils/auth-checker");
module.exports = {
  Query: {
    async getNotifications(_, {}, context) {
      const user = authChecker(context);
      console.log(user.id);
      const notifications = await Notifications.find({ receiver: user.id });

      return notifications;
    },
  },
  // Mutation: {
  //   async notification(
  //     _,
  //     { sender, receiver, notiType, content, is_read, ref_id },
  //     context
  //   ) {},
  // },
};
