const Joi = require("joi");
const mongoose = require("mongoose");

const currentYear = new Date().getFullYear();

const reviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  content: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  workload: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  lab: {
    type: Number,
    min: 0,
    max: 10,
  },
  homework: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  classParticipation: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  instructorEnthusiasm: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  grading: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  flexibility: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  textbookUse: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    max: currentYear,
    required: true,
  },
  anonymous: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: [
    {
      type: Date,
      required: true,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  const schema = Joi.object({
    course: Joi.objectId().required(),
    instructor: Joi.objectId().required(),
    content: Joi.string().required(),
    workload: Joi.number().min(0).max(10).required(),
    lab: Joi.number().min(0).max(10),
    homework: Joi.number().min(0).max(10).required(),
    classParticipation: Joi.number().min(0).max(10).required(),
    instructorEnthusiasm: Joi.number().min(0).max(10).required(),
    grading: Joi.number().min(0).max(10).required(),
    flexibility: Joi.number().min(0).max(10).required(),
    textbookUse: Joi.string().valid("Never", "Sometimes", "Always").required(),
    term: Joi.string().valid("Fall", "Winter", "Spring", "December").required(),
    year: Joi.number().max(currentYear).required(),
    anonymous: Joi.bool().required(),
    user: Joi.objectId().required(),
    time: Joi.date().required(),
  });

  return schema.validate(review);
}

exports.Review = Review;
exports.validateReview = validateReview;
