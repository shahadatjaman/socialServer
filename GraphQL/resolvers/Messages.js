const Message = require("../../model/Message");

const Conversations = require("../../model/Conversations");

const User = require("../../model/User");

const authChecker = require("../../utils/auth-checker");
const { get } = require("mongoose");

module.exports = {
  Mutation: {
    async sendMessage(_, { text, sender, receiver }, context) {
      // const user = authChecker(context);

      const user = await User.findById(sender);

      const conversation = await Conversations.findOne({
        participant_id: receiver,
      });

      if (!conversation) {
        const conversation = {
          name: user.firstName + " " + user.lastName,
          creator_id: sender,
          participant_id: receiver,
          createdAt: new Date().toISOString(),
        };

        const newConversations = new Conversations(conversation);

        await newConversations.save();
      }

      const message = {
        text,
        sender,
        receiver,
        createdAt: new Date().toISOString(),
      };
      const newMessage = new Message(message);

      await newMessage.save();

      return message;
    },
  },
  Query: {
    async getConversations(_, { sender }, context) {
      let creator = await Conversations.find({
        creator_id: sender,
      }).sort({ createdAt: -1 });

      let participant = await Conversations.find({
        participant_id: sender,
      });

      participant = participant.filter(
        (message) => message.creator_id.toString() !== sender
      );

      if (creator) {
        if (participant) {
          creator.push.apply(creator, participant);
          return creator;
        }
        return creator;
      }
    },
    async getMessages(_, { sender, receiver }, context) {
      let creator = await Message.find({ sender: sender });

      let participant = await Message.find({ sender: receiver });

      participant = participant.filter(
        (message) => message.sender.toString() !== sender
      );

      if (creator) {
        if (participant) {
          creator.push.apply(creator, participant);
          return creator;
        }
        return creator;
      }
    },
  },
};
