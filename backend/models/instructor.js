const Joi = require("joi");
const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 20,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const Instructor = mongoose.model("Instructor", instructorSchema);

function validateInstructor(instructor) {
  const schema = Joi.object({
    firstName: Joi.string().min(5).max(20).required(),
    lastName: Joi.string().min(5).max(20).required(),
    department: Joi.objectId().required(),
  });

  return schema.validate(instructor);
}

exports.Instructor = Instructor;
exports.validateInstructor = validateInstructor;
