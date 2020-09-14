const Joi = require("joi");
const bcrypt = require("bcrypt");
const validate = require("../middleware/validate");
const { User } = require("../models/user");
const express = require("express");
// const winston = require('winston/lib/winston/config');
const router = express.Router();

function validateUser(req) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
      .regex(/@lawrence.edu$/),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

router.post("/", validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
