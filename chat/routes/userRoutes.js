const express = require("express");
const { allUsers } = require("../controllers/userControllers");
const { isAuth } = require("@enterprisepro/common");

const router = express.Router();
router.route("/").get(isAuth, allUsers);

module.exports = router;
