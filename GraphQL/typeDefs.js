const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    avatars: [Avatar]
    cover: [Cover]
    notification: [Notifications]!
    isVerified: Boolean!
  }
  type Users {
    id: ID!
    firstName: String!
    lastName: String!
    avatars: [Avatar]
    bio: String!
    cover: [Cover]
    followers: [Follow]
  }
  type Post {
    userId: String!
    firstName: String!
    lastName: String!
    _id: String!
    username: String!
    body: String!
    createdAt: String!
    readTime: String!
    postType: String!
    image: String!
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    userId: String!
    postId: String!
    text: String!
    likes: [ReactToComment]!
    createdAt: String!
  }
  type ReactToComment {
    _id: String!
    commentId: String!
    userId: String!
    createdAt: String!
  }
  type Reply {
    userId: String!
    username: String!
    author: String!
    body: String!
    createdAt: String!
    _id: String!
  }

  type Like {
    userId: String!
    createdAt: String!
    _id: String!
  }

  type SingleUser {
    avatar: String!
    createdAt: String!
    cover: String!
    readNotification: Int!
  }

  input RegisterField {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Avatar {
    avatar: String!
    createdAt: String!
  }

  type userById {
    id: String!
    firstName: String!
    lastName: String!
    avatars: [Avatar]!
    cover: [Cover]!
    following: [Follow]!
    followers: [Follow]!
    bio: String!
  }
  type Cover {
    url: String!
    createdAt: String!
  }
  type File {
    url: String!
  }

  type Notifications {
    name: String!
    authorId: String!
    avatar: String!
    senderId: String!
    createdAt: String!
    text: String
  }
  type commnetAvatar {
    avatar: String!
    isStock: Int!
  }

  type Follow {
    name: String!
    userId: String!
  }
  type publicUser {
    firstName: String!
    lastName: String!
    id: String!
    bio: String!
  }

  # Conversations
  type Conversations {
    id: String!
    name: String!
    creator_id: String!
    participant_id: String!
    createdAt: String!
  }

  # Message
  type Message {
    text: String!
    sender: String!
    receiver: String!
    createdAt: String!
  }

  type Messages {
    id: ID!
    text: String!
    sender: String!
    receiver: String!
    createdAt: String!
  }

  type NotificationCreate {
    sender: String!
    receiver: String!
    notiType: String!
    content: String!
    is_read: Boolean!
    ref_id: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]!
    getPost: [Post]!
    getSinglePost(postId: ID!): Post!
    getUser: SingleUser!
    getUsers: [User]!
    users: [Users]!
    infinitePost(limit: Int!, offset: Int!): [Post]!
    notifications: [Notifications]!
    getCommentAvatar(userId: ID!): commnetAvatar!
    getUserById(userId: ID!): userById!
    getPostsByUserId(userId: ID!): [Post]!
    getFollowing: [Follow]!
    publicUsers: [publicUser]!
    getReply(postId: ID!, commentId: ID!): [Reply]!
    # Get conversations
    getConversations(sender: ID!): [Conversations]!

    getNotifications: [NotificationCreate]!

    # Get comments
    comments(postId: ID!): Comment!
    #Get Messages
    getMessages(sender: String!, receiver: String!): [Messages]!
  }

  type Mutation {
    register(registerInput: RegisterField): User!

    login(email: String!, password: String!): User!

    createPost(body: String!, postType: String!, image: String!): Post!

    # Create New comment
    createComment(userId: ID!, postId: ID!, text: String!): Comment!

    createReply(postId: ID!, commentId: ID!, body: String!): Post!

    likePost(postId: ID!): Post!

    uploadIamge(url: String!, userId: ID!): File!

    uploadCover(url: String!, userId: ID!): Cover!

    createNotification(
      postId: ID!
      authorId: ID!
      name: String!
      text: String!
      type: String!
      avatar: String!
    ): User!

    # addFriend(senderId : ID! recieverId : ID!):
    seenNotifications: SingleUser!
    addFollow(receiverId: String!): [Follow]!

    #Search
    search(name: String!): [Users]!

    #Delete post
    deletePost(postId: ID!): [Post]

    # Update post
    updatePost(postId: ID!, text: String!): Post!

    # Add Bio
    addBio(text: String!): String!

    # Send Message
    sendMessage(text: String!, sender: ID!, receiver: ID!): Message!

    #Like Comment

    reactionTocomment(commentId: ID!, userId: ID!): Comment!

    # Create Notifications

    notification(
      sender: ID!
      receiver: ID!
      notiType: String!
      content: String!
      ref_id: String!
      is_read: Boolean!
    ): NotificationCreate!
  }
`;
