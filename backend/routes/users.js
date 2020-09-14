const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const validate = require("../middleware/validate");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find().sort("email");
  res.send(users);
});

router.post("/", validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered.");

  user = new User(
    _.assign(
      _.pick(req.body, ["name", "email", "password", "class", "major"]),
      { isAdmin: false }
    )
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(req.body, ["_id", "name", "email", "class", "major"]));
});

module.exports = router;
