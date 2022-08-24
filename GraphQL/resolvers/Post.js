const { UserInputError } = require("apollo-server-core");
const Post = require("../../model/Post");

const User = require("../../model/User");

const authChecker = require("../../utils/auth-checker");
module.exports = {
  Mutation: {
    async createPost(_, { body, postType, image }, context) {
      const user = authChecker(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const text = body;

      const wpm = 225;

      const words = text.trim().split(/\s+/).length;

      const time = Math.ceil(words / wpm);

      const userData = await User.findById(user.id);

      if (user) {
        const newPost = new Post({
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.id,
          username: user.username,
          body,
          postType,
          image,
          comments: [],
          readTime: time,
          createdAt: new Date().toISOString(),
        });

        const post = newPost.save();

        return post;
      }
    },

    async likePost(_, { postId }, context) {
      const user = authChecker(context);
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.userId === user.id)) {
          //    if already liked
          post.likes = post.likes.filter((like) => like.userId !== user.id);
        } else {
          // Not liked, like post
          post.likes.push({
            userId: user.id,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();

        return post;
      } else throw new UserInputError("Post not found");
    },

    async createNotification(
      _,
      { postId, authorId, avatar, type, text },
      context
    ) {
      let user = authChecker(context);

      let authorInfo = await User.findById(authorId);

      if (authorInfo) {
        if (authorInfo.notification.find((noti) => noti.senderId === user.id)) {
          authorInfo.notification = authorInfo.notification.filter(
            (noti) => noti.senderId !== user.id
          );
        } else {
          authorInfo.notification.push({
            postId,
            authorId,
            senderId: user.id,
            notificationType: type,
            name: user.firstName + " " + user.lastName,
            avatar,
            text,
            notiType: type,
            createdAt: new Date().toISOString(),
            read: false,
          });
          authorInfo.readNotification = authorInfo.readNotification + 1;
        }

        await authorInfo.save();

        return authorInfo;
      } else throw new UserInputError("Post not found");
    },
    async seenNotifications(_, {}, context) {
      let user = authChecker(context);
      let userInfo = await User.findById(user.id);
      userInfo.readNotification = 0;

      userInfo.save();

      return {
        avatar: userInfo.avatars.length !== 0 && userInfo.avatars[0].avatar,
        cover: userInfo.cover.length !== 0 && userInfo.cover[0].url,
        readNotification: userInfo.readNotification,
      };
    },

    async deletePost(_, { postId }, context) {
      const user = authChecker(context);

      let post = await Post.findByIdAndDelete({ _id: postId });

      let posts = await Post.find();

      if (post && posts) {
        return posts;
      } else throw new UserInputError("Post not found");
    },
    async updatePost(_, { postId, text }, context) {
      // Checking authentication
      const user = authChecker(context);
      const post = await Post.findById(postId);
      post.body = text;

      await post.save();

      return post;
    },
  },

  Query: {
    async getPosts() {
      const posts = await Post.find().sort({ createdAt: -1 });

      return posts;
    },
    async getPost() {
      const post = await Post.find().sort({ createdAt: -1 });
      return post;
    },
    async getSinglePost(_, { postId }) {
      const post = Post.findById(postId);
      if (post) {
        return post;
      }
    },
    async infinitePost(_, { limit, offset }) {
      let allPost = await Post.find();

      let posts = allPost.slice(offset, offset + limit);

      return posts;
    },
    async getPostsByUserId(_, { userId }) {
      const posts = await Post.find({ userId }).sort({ createdAt: -1 });
      return posts;
    },
  },
};
