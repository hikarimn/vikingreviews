import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .regex(/^([a-zA-Z0-9\.]+)@lawrence.edu$/)
    .messages({
      "string.empty": "Email cannot be left empty.",
      "string.pattern.base":
        "Email must be a Lawrence account and can contain only alphanumeric characters, periods, and underscores.",
    }),
  password: Joi.string().min(5).max(32).messages({
    "string.empty": "Password cannot be left empty.",
    "string.min": "Password should have a minimum length of 5.",
    "string.max": "Password should have a maximum length of 32.",
  }),
});

const maxYear = new Date().getFullYear() + 5;

const signUpSchema = Joi.object({
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\.]+)@lawrence.edu$/)
    .messages({
      "string.empty": "Email cannot be left empty.",
      "string.pattern.base":
        "Email must be a Lawrence account and can contain only alphanumeric characters, periods, and underscores.",
    }),
  password: Joi.string().min(5).max(32).messages({
    "string.empty": "Password cannot be left empty.",
    "string.min": "Password should have a minimum length of 5.",
    "string.max": "Password should have a maximum length of 32.",
  }),
  name: Joi.string().min(5).max(32).messages({
    "string.min": "Name should have a minimum length of 5.",
    "string.max": "Name should have a maximum length of 32.",
    "string.empty": "Name cannot be left empty.",
  }),
  major: Joi.string()
    .regex(/^[a-zA-Z,\s]+$/)
    .messages({
      "string.pattern.base":
        "Major(s), minor(s) can only contain letters, commas, and spaces.",
      "string.empty": "Major(s), minor(s) cannot be left empty.",
    }),
  class: Joi.number()
    .min(1847)
    .max(maxYear)
    .messages({
      "number.min": "Class year needs to be greater than or equal to 1847.",
      "number.max": `Class year needs to be no greater than ${maxYear}.`,
      "number.base": `Class year has to be a number between 1847 and ${maxYear}.`,
      "number.empty": "Class year cannot be left empty.",
    }),
});

const maxContact = 500;

const contactUsSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email cannot be left empty.",
      "string.email": "This is not a valid email.",
    }),
  comment: Joi.string()
    .min(10)
    .max(maxContact)
    .messages({
      "string.empty": "Say something :-).",
      "string.min": "Comment should have a minimum length of 10.",
      "string.max": `Comment should have a maximum length of ${maxContact}.`,
    }),
});

const maxComment = 1000;

const addReviewSchema = Joi.object({
  comment: Joi.string()
    .min(10)
    .max(maxComment)
    .messages({
      "string.empty": "Say something :-).",
      "string.min": "Comment should have a minimum length of 10.",
      "string.max": `Comment should have a maximum length of ${maxComment}.`,
    }),
});

export {
  loginSchema,
  signUpSchema,
  contactUsSchema,
  maxContact,
  addReviewSchema,
  maxComment,
};
