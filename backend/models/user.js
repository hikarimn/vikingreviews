const config = require("config"); // configuration
const jwt = require("jsonwebtoken");
const Joi = require("joi"); // validation
const mongoose = require("mongoose"); // mongoDb

const maxYear = new Date().getFullYear() + 5;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\.]+)@lawrence.edu$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  class: {
    type: Number,
    required: true,
    min: 1847,
  },
  major: {
    type: String,
    required: true,
    match: /^[a-zA-Z,\s]+$/,
  },
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      class: this.class,
      major: this.major,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(32).required(),
    email: Joi.string()
      .required()
      .email()
      .regex(/^([a-zA-Z0-9_\.]+)@lawrence.edu$/),
    password: Joi.string().min(5).max(70).required(),
    class: Joi.number().min(1847).max(maxYear).required(),
    major: Joi.string()
      .regex(/^[a-zA-Z,\s]+$/)
      .required(),
    isAdmin: Joi.bool(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
