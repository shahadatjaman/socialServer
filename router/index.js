const router = require("express").Router();

const { verifyAccount } = require("../controlller/sendMail");

const { userActive } = require("../controlller/userActive");

const { forgotPassword } = require("../controlller/forgetPassword");

const { recoveryPassword } = require("../controlller/recoveryPassword");

const { getComments, reactionToComment } = require("../controlller/comments");

const {
  notications,
  getNotifications,
  getIsRead,
} = require("../controlller/notifications");

const upload = require("../controlller/fileUpload/");

const { avatar } = require("../controlller/fileUpload/avatar");

const { createPost } = require("../controlller/posts/CreatePost");

const authenticate = require("../authentication/authenticate");

router.post("/verify", verifyAccount);
router.post("/activeUser", userActive);
router.post("/forgotpassword", forgotPassword);
router.post("/recoverypassword", recoveryPassword);
router.get("/getcomments/:postId", getComments);
router.get("/reacttocomment/:commentId/:userId/:type", reactionToComment);
router.post("/notification/", notications);
router.get("/getnotifications/:userId", getNotifications);
router.get("/getisread/:userId", getIsRead);
router.post("/fileupload/:userId", upload.single("avatar"), avatar);
router.post("/createpost", authenticate, createPost);
module.exports = router;
