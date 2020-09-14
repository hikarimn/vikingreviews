const { Course, validateCourse } = require("../models/course");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Department } = require("../models/department");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/", async (req, res) => {
  const courses = await Course.find().populate("department").sort("title");
  res.send(courses);
});

router.get("/department=:id", validateObjectId, async (req, res) => {
  const department = await Department.findById(req.params.id);
  if (!department) return res.status(400).send("Invalid department.");

  const courses = await Course.find({
    department: ObjectId(department._id),
  })
    .populate("department")
    .sort("number");
  res.send(courses);
});

router.post("/", [auth, admin, validate(validateCourse)], async (req, res) => {
  const department = await Department.findById(req.body.department);
  if (!department) return res.status(400).send("Invalid department.");

  const course = new Course({
    title: req.body.title,
    department: req.body.department,
    number: req.body.number,
    units: req.body.units,
  });
  await course.save();

  res.send(course);
});

router.put(
  "/:id",
  [auth, admin, validateObjectId, validate(validateCourse)],
  async (req, res) => {
    const department = await Department.findById(req.body.department);
    if (!department) return res.status(400).send("Invalid department.");

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        department: req.body.department,
        number: req.body.number,
        units: req.body.units,
      },
      { new: true }
    );

    if (!course)
      return res
        .status(404)
        .send("The course with the given ID was not found.");

    res.send(course);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  res.send(course);
});

module.exports = router;
