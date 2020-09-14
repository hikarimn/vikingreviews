const { Review, validateReview } = require("../models/review");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Course } = require("../models/course");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const reviews = await Review.find();
  res.send(reviews);
});

router.get("/course=:id", validateObjectId, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(400).send("Invalid course.");

  const reviews = await Review.find({
    course: ObjectId(course._id),
  })
    .populate("department")
    .sort("title");
  res.send(reviews);
});

router.post("/", [auth, validate(validateReview)], async (req, res) => {
  const course = await Course.findById(req.body.course);
  if (!course) return res.status(400).send("Invalid course.");

  const review = new Review({
    course: req.body.course,
    instructor: req.body.instructor,
    content: [req.body.content],
    workload: req.body.workload,
    lab: req.body.lab,
    homework: req.body.homework,
    classParticipation: req.body.classParticipation,
    instructorEnthusiasm: req.body.instructorEnthusiasm,
    grading: req.body.grading,
    flexibility: req.body.flexibility,
    textbookUse: req.body.textbookUse,
    term: req.body.term,
    year: req.body.year,
    anonymous: req.body.anonymous,
    user: req.body.user,
    time: [req.body.time],
    likes: [],
    dislikes: [],
  });
  await review.save();

  res.send(review);
});

router.put(
  "/:id",
  [auth, validateObjectId, validate(validateReview)],
  async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(400).send("Invalid review.");

    await Review.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          content: req.body.content,
          likes: req.body.like,
          dislikes: req.body.dislike,
        },
        workload: req.body.workload,
        lab: req.body.lab,
        homework: req.body.homework,
        classParticipation: req.body.classParticipation,
        instructorEnthusiasm: req.body.instructorEnthusiasm,
        grading: req.body.grading,
        flexibility: req.body.flexibility,
        textbookUse: req.body.textbookUse,
      },
      { new: true }
    );

    res.send(review);
  }
);

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const review = await Review.findByIdAndRemove(req.params.id);

  if (!review)
    return res.status(404).send("The review with the given ID was not found.");

  res.send(review);
});

router.get("/:id", [auth, validateObjectId], async (req, res) => {
  const review = await Course.findById(req.params.id);

  if (!review)
    return res.status(404).send("The review with the given ID was not found.");

  res.send(review);
});

module.exports = router;
