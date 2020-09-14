const { Instructor, validateInstructor } = require("../models/instructor");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const { Department } = require("../models/department");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const instructors = await Instructor.find()
    .populate("department")
    .sort("lastName");
  res.send(instructors);
});

router.post(
  "/",
  [auth, admin, validate(validateInstructor)],
  async (req, res) => {
    const department = await Department.findById(req.body.department);
    if (!department) return res.status(400).send("Invalid department.");

    const instructor = new Instructor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
    });
    await instructor.save();

    res.send(instructor);
  }
);

router.put(
  "/:id",
  [auth, admin, validateObjectId, validate(validateInstructor)],
  async (req, res) => {
    const department = await Department.findById(req.body.department);
    if (!department) return res.status(400).send("Invalid department.");

    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
      },
      { new: true }
    );

    if (!instructor)
      return res
        .status(404)
        .send("The instructor with the given ID was not found.");

    res.send(instructor);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const instructor = await Instructor.findByIdAndRemove(req.params.id);

  if (!instructor)
    return res
      .status(404)
      .send("The instructor with the given ID was not found.");

  res.send(instructor);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const instructor = await Instructor.findById(req.params.id);

  if (!instructor)
    return res
      .status(404)
      .send("The instructor with the given ID was not found.");

  res.send(instructor);
});

module.exports = router;
