const express = require("express");
const {
  allMessages,
  sendMessage,
  viewedMessages,
} = require("../controllers/messageControllers");
const { isAuth } = require("@enterprisepro/common");

const router = express.Router();

router.route("/:chatId").get(isAuth, allMessages);
router.route("/viewed").post(isAuth, viewedMessages);
router.route("/").post(isAuth, sendMessage);

module.exports = router;
