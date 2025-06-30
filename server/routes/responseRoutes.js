const express = require("express");
const router = express.Router();
const StudentResponse = require("../models/StudentResponse");

router.post("/submit", async (req, res) => {
  const { student, answers, teacherEmail } = req.body;
  await new StudentResponse({ student, answers, teacherEmail }).save();
  res.status(201).json({ message: "Quiz submitted" });
});

router.get("/:teacherEmail", async (req, res) => {
  const responses = await StudentResponse.find({ teacherEmail: req.params.teacherEmail });
  res.json(responses);
});

module.exports = router;