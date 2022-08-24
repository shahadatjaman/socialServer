const User = require("../../model/User");

module.exports = {
  Mutation: {
    async search(_, { name }) {
      let text = name.trim().replace(" ", "+");



      let users = await User.find({
        $or: [
          {
            firstName: { $regex: new RegExp("^" + text + ".*", "i") },
          },
          {
            lastName: { $regex: new RegExp("^" + text + ".*", "i") },
          },
          {
            username: { $regex: new RegExp("^" + text + ".*", "i") },
          },
        ],
      }).exec();

      return users;
    },
  },
};
