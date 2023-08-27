const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { isAuth } = require("@enterprisepro/common");

const router = express.Router();

router.route("/").post(isAuth, accessChat);
router.route("/").get(isAuth, fetchChats);
router.route("/group").post(isAuth, createGroupChat);
router.route("/rename").put(isAuth, renameGroup);
router.route("/groupremove").put(isAuth, removeFromGroup);
router.route("/groupadd").put(isAuth, addToGroup);

module.exports = router;
