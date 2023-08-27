const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  }).find({ _id: { $ne: new ObjectId(req.user._id) } });
  res.send(users);
});

module.exports = { allUsers };
